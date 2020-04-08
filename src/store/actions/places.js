import { CREATE_PLACE, DELETE_PLACE } from './actionTypes'
import { showAlert, hideAlert } from './app'


export function createPlace(place) {
  return (dispatch, getState) => {
    const state = getState().places

    dispatch({
      type: CREATE_PLACE,
      places: [...state.places, { id: state.places.length + 1, name: place.value }]
    })

    dispatch(showAlert())

    let setTimeoutId = setTimeout(() => {
      dispatch(hideAlert())
      clearTimeout(setTimeoutId)
    }, 3000)
  }
}

export function deletePlace(placeId) {
  return (dispatch, getState) => {
    const state = getState().places
    let places = state.places.filter(place => place.id !== placeId)

    dispatch({
      type: DELETE_PLACE,
      places
    })

    dispatch(showAlert())

    let setTimeoutId = setTimeout(() => {
      dispatch(hideAlert())
      clearTimeout(setTimeoutId)
    }, 3000)
  }
}