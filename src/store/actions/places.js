import { CREATE_PLACE, DELETE_PLACE, SAVE_PLACE_ID } from './actionTypes'
import { showAlert, hideAlert, showModal } from './app'


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

export function beforeDeletePlace(placeId) {
  return (dispatch, getState) => {
    const stateBooks = getState().books.books
    const statePlaces = getState().places.places

    const place = statePlaces.find(place => place.id === placeId)
    const books = stateBooks.filter(book => book.place === place.name)

    if (books.length) {
      dispatch(showModal({
        text: 'Нельзя удалить месторасположение, у которого есть книги.'
      }))
    } else {
      dispatch({
        type: SAVE_PLACE_ID,
        placeId
      })
      dispatch(showModal({
        title: 'Удаление месторасположения ' + place.name,
        text: 'Вы уверены?',
        actionBtn: 'Удалить',
        closeBtn: 'Отмена'
      }))
    }
  }
}

export function deletePlace() {
  return (dispatch, getState) => {
    const state = getState().places
    let places = state.places.filter(place => place.id !== state.placeToDeleteId)

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