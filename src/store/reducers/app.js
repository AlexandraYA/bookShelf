import {
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_MODAL,
  HIDE_MODAL,
  RESET_FILTER_SETTINGS,
  SAVE_SORT_VALUE,
  SAVE_FILTER_VALUE,
  SAVE_SEARCH_VALUE,
  SAVE_SEARCH_FIELD_VALUE
} from '../actions/actionTypes'
import sortTypes from '../../data/sortTypes.json'

const defaultFilterSettings = {
  search: '',
  searchField: 'author',
  sortType: '',
  filter: ''
}

const initialState = {
  showAlert: false,
  showModal: false,
  modalText: '',
  modalTitle: '',
  modalCloseBtn: 'Закрыть',
  modalActionBtn: '',
  modalAction: null,
  typeModal: 'deletePlace',
  sortTypes: sortTypes.sortTypes,
  filterSettings: defaultFilterSettings
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
    case RESET_FILTER_SETTINGS:
      return {
        ...state,
        filterSettings: defaultFilterSettings
      }
    case SAVE_SORT_VALUE:
      return {
        ...state,
        filterSettings: { ...state.filterSettings, sortType: action.value }
      }
    case SAVE_FILTER_VALUE:
      return {
        ...state,
        filterSettings: { ...state.filterSettings, filter: action.value }
      }
    case SAVE_SEARCH_VALUE:
      return {
        ...state,
        filterSettings: { ...state.filterSettings, search: action.value }
      }
    case SAVE_SEARCH_FIELD_VALUE:
      return {
        ...state,
        filterSettings: { ...state.filterSettings, searchField: action.value }
      }
    default:
      return state
  }
}
