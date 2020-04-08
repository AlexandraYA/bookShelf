import { combineReducers } from 'redux'
import booksReducer from './books'
import appReducer from './app'
import placesReducer from './places'


export default combineReducers({
  books: booksReducer,
  app: appReducer,
  places: placesReducer
});