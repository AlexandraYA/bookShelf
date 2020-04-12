import { SHOW_ALERT, HIDE_ALERT, SHOW_MODAL, HIDE_MODAL } from './actionTypes'
import { deletePlace } from './places'


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
    }
    dispatch(hideModal())
  }
}

export function hideModal() {
  return {
    type: HIDE_MODAL
  }
}
