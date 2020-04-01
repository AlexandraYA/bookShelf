import { CREATE_BOOK, GET_BOOK_BY_ID } from './actionTypes'


export function addBookToLibrary(newBook) {
  return {
    type: CREATE_BOOK,
    newBook
  }
}


export function getBookById(bookId) {
  return {
    type: GET_BOOK_BY_ID,
    bookId: parseInt(bookId)
  }
}