import { CREATE_PLACE, DELETE_PLACE } from '../actions/actionTypes'

const initialState = {
  places: [
    {
      id: 1,
      name: "полка 1 справа"
    },
    {
      id: 2,
      name: "полка 2 справа"
    },
    {
      id: 3,
      name: "полка на в шкафу у окна"
    },
    {
      id: 4,
      name: "полка внизу справа"
    }
  ]
}

export default function placesReducer (state = initialState, action) {

  switch (action.type) {
    case CREATE_PLACE:
      return {
        places: action.places
      }
    case DELETE_PLACE:
      return {
        places: action.places
      }
    default:
      return state
  }
}