import { SHOW_ALERT, HIDE_ALERT } from '../actions/actionTypes'


const initialState = {
  showAlert: false
}

export default function appReducer(state = initialState, action) {

  switch (action.type) {
    case SHOW_ALERT:
      return {
        showAlert: true
      }
    case HIDE_ALERT:
      return {
        showAlert: false
      }
    default:
      return {
        showAlert: false
      }
  }
}
