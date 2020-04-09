import { SHOW_ALERT, HIDE_ALERT, SHOW_MODAL, HIDE_MODAL } from '../actions/actionTypes'


const initialState = {
  showAlert: false,
  showModal: false,
  modalText: '',
  modalTitle: '',
  modalCloseBtn: 'Отмена',
  modalActionBtn: '',
  modalAnswer: null
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
        modalActionBtn: action.data.actionBtn || 'Удалить',
        modalAnswer: null
      }
    case HIDE_MODAL:
      return {
        ...state,
        showModal: false,
        modalText: '',
        modalTitle: '',
        modalCloseBtn: 'Отмена',
        modalActionBtn: 'Удалить',
        modalAnswer: action.answer
      }
    default:
      return state
  }
}
