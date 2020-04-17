import {
  CREATE_BOOK,
  GET_BOOK_BY_ID,
  MODIFY_BOOKS_LIST,
  FETCH_BOOKS,
  TO_PAGE_EDIT_BOOK,
  EDIT_BOOK,
  DELETE_BOOK,
  SAVE_BOOK_ID
} from './actionTypes'
import { showAlert, hideAlert, showModal, saveSortValue } from './app'
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

export function beforeDeleteBook(bookId) {
  return (dispatch, getState) => {
    const stateBooks = getState().books.books
    const book = stateBooks.find(book => book.id === bookId)

    dispatch({
      type: SAVE_BOOK_ID,
      bookId
    })
    dispatch(showModal({
      title: 'Удаление книги ' + book.name,
      text: 'Вы уверены?',
      actionBtn: 'Удалить',
      closeBtn: 'Отмена',
      typeModal: 'deleteBook'
    }))
  }
}

export function deleteBook() {
  return {
    type: DELETE_BOOK
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

export function searchIntoAllFields() {
  return (dispatch, getState) => {
    const state = getState()
    const value = state.app.filterSettings.search
    let resultsInAuthors = state.books.books.filter(book => {
      if (book.author.toLowerCase().includes(value.toLowerCase())) {
        return book
      }
    })
    let resultsInNames = state.books.books.filter(book => {
      if (book.name.toLowerCase().includes(value.toLowerCase())) {
        return book
      }
    })

    return dispatch(showModifiedBooksList(resultsInAuthors.concat(resultsInNames)))
  }
}

export function search() {
  return (dispatch, getState) => {
    const state = getState()
    const field = state.app.filterSettings.searchField
    const value = state.app.filterSettings.search
    let books = state.books.books.filter(book => {
      if (book[field].toLowerCase().includes(value.toLowerCase())) {
        return book
      }
    })

    return dispatch(showModifiedBooksList(books))
  }
}

export function filter() {
  return (dispatch, getState) => {
    const state = getState()
    const place = state.app.filterSettings.filter
    let books = state.books.books.filter(book => {
      if (book.place === place) {
        return book
      }
    })

    return dispatch(showModifiedBooksList(books))
  }
}

export function setSortTypeAndSort(sortType) {
  return dispatch => {
    dispatch(saveSortValue(sortType))
    dispatch(sort())
  }
}

export function sort() {
  return (dispatch, getState) => {
    const state = getState()
    const sortType = state.app.filterSettings.sortType
    let field = sortTypes.sortTypes[sortType].field
    let up = sortTypes.sortTypes[sortType].up

    let books = state.books.booksShow.sort(function (a, b) {
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