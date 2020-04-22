import { CREATE_PLACE, DELETE_PLACE, SAVE_PLACE_ID } from '../actions/actionTypes'

const initialState = {
  places: [
    {
      id: 1,
      name: "на шкафу Икея"
    },
    {
      id: 2,
      name: "трельяж"
    },
    {
      id: 3,
      name: "шкаф у двери 2 снизу"
    },
    {
      id: 4,
      name: "шкаф у двери левая верхняя"
    },
    {
      id: 3,
      name: "шкаф у двери нижняя"
    },
    {
      id: 4,
      name: "шкаф у двери правая верхняя"
    }
  ],
  placeToDeleteId: null
}

export default function placesReducer (state = initialState, action) {

  switch (action.type) {
    case CREATE_PLACE:
      return {
        ...state,
        places: action.places
      }
    case DELETE_PLACE:
      return {
        ...state,
        places: action.places
      }
    case SAVE_PLACE_ID:
      return {
        ...state,
        placeToDeleteId: action.placeId
      }
    default:
      return state
  }
}