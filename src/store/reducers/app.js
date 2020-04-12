import { SHOW_ALERT, HIDE_ALERT, SHOW_MODAL, HIDE_MODAL } from '../actions/actionTypes'


const initialState = {
  showAlert: false,
  showModal: false,
  modalText: '',
  modalTitle: '',
  modalCloseBtn: 'Закрыть',
  modalActionBtn: '',
  modalAction: null,
  typeModal: 'deletePlace'
}

export default function appReducer(state = initialState, action) {

  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        showAlert: true
      }
    case HIDE_ALERT:
      return {
        ...state,
        showAlert: false
      }
    case SHOW_MODAL:
      return {
        ...state,
        showModal: true,
        modalText: action.data.text || '',
        modalTitle: action.data.title || '',
        modalActionBtn: action.data.actionBtn || '',
        modalCloseBtn: action.data.closeBtn || 'Закрыть',
        typeModal: action.data.typeModal || 'deletePlace'
      }
    case HIDE_MODAL:
      return {
        ...state,
        showModal: false,
        modalText: '',
        modalTitle: '',
        modalCloseBtn: 'Закрыть',
        modalActionBtn: ''
      }
    default:
      return state
  }
}
