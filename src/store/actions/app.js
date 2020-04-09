import { SHOW_ALERT, HIDE_ALERT, SHOW_MODAL, HIDE_MODAL } from './actionTypes'


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

export function hideModal(answer) {
  return {
    type: HIDE_MODAL,
    answer
  }
}
