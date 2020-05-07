import {
  LOGIN,
  REGISTER,
  LOGOUT,
  SET_ERROR,
  TOKEN_TRUE,
  TOKEN_FALSE
} from './actionTypes'
import { showAlert, hideAlert } from './app'
import { v4 } from 'uuid'


export function login(email, pwd, history) {
  return (dispatch, getState) => {
    const state = getState().auth
    const user = state.users.find(user => user.login === email)

    if (!user) {
      dispatch({
        type: SET_ERROR,
        error: 'emailNotFound'
      })
      return activateAlert(dispatch)
    }

    if (user.password !== pwd) {
      dispatch({
        type: SET_ERROR,
        error: 'pwdIncorrect'
      })
      return activateAlert(dispatch)
    }

    const token = v4()
    window.localStorage.setItem('dombibliotoken', token)

    dispatch({
      type: LOGIN,
      token
    })

    return history.push('/')
  }
}

export function register(email, pwd) {
  return dispatch => {
    return dispatch({
      type: REGISTER,
      newUser: {
        login: email,
        password: pwd
      }
    })
  }
}

export function logout(history) {
  return dispatch => {
    dispatch({
      type: LOGOUT
    })
    window.localStorage.removeItem('dombibliotoken')
    return history.push('/auth')
  }
}

export function checkToken(history) {
  return (dispatch, getState) => {
    const currentToken = getState().auth.token
    const storageToken = window.localStorage.getItem('dombibliotoken')

    if (storageToken && storageToken === currentToken) {
      return dispatch({
        type: TOKEN_TRUE
      })
    } else {
      dispatch({
        type: TOKEN_FALSE
      })
      return history.push('/auth')
    }
  }
}

function activateAlert(dispatch) {
  dispatch(showAlert())

  let setTimeoutId = setTimeout(() => {
    dispatch(hideAlert())
    clearTimeout(setTimeoutId)
  }, 3000)
}
