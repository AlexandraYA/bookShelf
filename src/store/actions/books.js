import {
  CREATE_BOOK,
  GET_BOOK_BY_ID,
  MODIFY_BOOKS_LIST,
  FETCH_BOOKS,
  TO_PAGE_EDIT_BOOK,
  EDIT_BOOK,
  DELETE_BOOK
} from './actionTypes'
import { showAlert, hideAlert } from './app'
import sortTypes from '../../utils/sortTypes.json'


export function fetchBooks() {
  return {
    type: FETCH_BOOKS
  }
}

export function toPageEditBook(bookId, history) {
  return dispatch => {

    dispatch({
      type: TO_PAGE_EDIT_BOOK,
      bookId
    })

    history.push('/edit')
  }
}

export function deleteBook(bookId) {
  return {
    type: DELETE_BOOK,
    bookId
  }
}

export function addBookToLibrary(newBook, history) {
  return (dispatch, getState) => {

    const state = getState().books
    let newBookId = state.books.length + 1
    let books = [...state.books, { ...newBook, id: newBookId }]

    dispatch({
      type: CREATE_BOOK,
      books
    })

    dispatch(showAlert())

    let setTimeoutId = setTimeout(() => {

      dispatch(hideAlert())
      history.push('/books/' + newBookId)

      clearTimeout(setTimeoutId)
    }, 3000)
  }
}

export function saveBook(editedBook, history) {
  return (dispatch, getState) => {
    const state = getState().books

    let editedBooks = state.books.map(book => {
      if (book.id === editedBook.id) {
        return editedBook
      } else {
        return book
      }
    })

    dispatch({
      type: EDIT_BOOK,
      editedBooks
    })

    dispatch(showAlert())

    let setTimeoutId = setTimeout(() => {

      dispatch(hideAlert())
      history.push('/books/' + editedBook.id)

      clearTimeout(setTimeoutId)
    }, 3000)
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

    return dispatch(showModifiedBooksList(books))
  }
}

export function filter(place) {
  return (dispatch, getState) => {
    let state = getState().books
    let books = state.books.filter(book => {
      if (book.place === place) {
        return book
      }
    })

    return dispatch(showModifiedBooksList(books))
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