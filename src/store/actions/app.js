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
} from './actionTypes'
import { deletePlace } from './places'
import { fetchBooks, deleteBook } from './books'


export function showAlert() {
  return {
    type: SHOW_ALERT
  }
}

export function hideAlert() {
  return {
    type: HIDE_ALERT
  }
}

export function showModal(data) {
  return {
    type: SHOW_MODAL,
    data
  }
}

export function doAction() {
  return (dispatch, getState) => {
    const state = getState().app
    if (state.typeModal === 'deletePlace') {
      dispatch(deletePlace())
    } else if (state.typeModal === 'deleteBook') {
      dispatch(deleteBook())
    }
    dispatch(hideModal())
  }
}

export function hideModal() {
  return {
    type: HIDE_MODAL
  }
}

export function resetFilterSettings() {
  return dispatch => {
    dispatch(fetchBooks())
    dispatch({type: RESET_FILTER_SETTINGS})
  }
}

export function saveSortValue(value) {
  return {
    type: SAVE_SORT_VALUE,
    value
  }
}

export function saveFilterValue(value) {
  return {
    type: SAVE_FILTER_VALUE,
    value
  }
}

export function saveSearchValue(value) {
  return {
    type: SAVE_SEARCH_VALUE,
    value
  }
}

export function saveSearchFieldValue(value) {
  return {
    type: SAVE_SEARCH_FIELD_VALUE,
    value
  }
}
