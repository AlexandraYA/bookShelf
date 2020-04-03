import { CREATE_BOOK, GET_BOOK_BY_ID, MODIFY_BOOKS_LIST, FETCH_BOOKS } from './actionTypes'

import sortTypes from '../../utils/sortTypes.json'


export function fetchBooks() {
  return {
    type: FETCH_BOOKS
  }
}

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

export function search(field, value) {
  return (dispatch, getState) => {
    let state = getState().books
    let books = state.books.filter(book => {
      if (book[field].toLowerCase().includes(value.toLowerCase())) {
        return book
      }
    })

    dispatch(showModifiedBooksList(books))
  }
}

export function sort(type) {
  return (dispatch, getState) => {
    let state = getState().books
    let field = sortTypes.sortTypes[type].field
    let up = sortTypes.sortTypes[type].up

    let books = state.booksShow.sort(function (a, b) {
      if (a[field] > b[field]) {
        return up ? 1 : -1
      }
      if (a[field] < b[field]) {
        return up ? -1 : 1
      }
      // a должно быть равным b
      return 0;
    })

    dispatch(showModifiedBooksList(books))
  }
}

function showModifiedBooksList(books) {
  return {
    type: MODIFY_BOOKS_LIST,
    books
  }
}