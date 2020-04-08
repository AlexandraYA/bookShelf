import { combineReducers } from 'redux'
import booksReducer from './books'
import appReducer from './app'


export default combineReducers({
  books: booksReducer,
  app: appReducer
});