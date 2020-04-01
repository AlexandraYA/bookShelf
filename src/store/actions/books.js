import { CREATE_BOOK } from './actionTypes'


export function addBookToLibrary(newBook) {
  return {
    type: CREATE_BOOK,
    newBook
  }
}