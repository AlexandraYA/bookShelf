import { SHOW_ALERT, HIDE_ALERT } from './actionTypes'


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
