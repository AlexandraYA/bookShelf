import {
  CREATE_BOOK,
  GET_BOOK_BY_ID,
  FETCH_BOOKS,
  TO_PAGE_EDIT_BOOK,
  EDIT_BOOK,
  DELETE_BOOK,
  SAVE_BOOK_ID
} from './actionTypes'
import { showAlert, hideAlert, showModal, saveSortValue } from './app'
import sortTypes from '../../utils/sortTypes.json'


export function fetchBooks(page = null) {
  return (dispatch, getState) => {
    const state = getState()
    let books = []

    if (state.app.filterSettings.search.length) {
      books = doSearch(state.app.filterSettings.searchField, state.app.filterSettings.search, state.books.books)
    }

    if (state.app.filterSettings.filter.length) {
      const startBooksArr = books.length ? books : state.books.books
      books = doFilter(state.app.filterSettings.filter, startBooksArr)
    }

    if (state.app.filterSettings.sortType.length) {
      const startBooksArr = books.length ? books : state.books.books
      books = doSort(state.app.filterSettings.sortType, startBooksArr)
    }

    const currentPage = page || 1
    const booksPerPage = state.books.booksPerPage
    const offset = booksPerPage * (currentPage - 1)
    const treatedBooks = books.length ? books : state.books.books
    const booksForPage = treatedBooks.slice(offset, offset + booksPerPage)
    const count = treatedBooks.length
    const allPages = Math.ceil(count / booksPerPage)

    return dispatch(showBooksList(booksForPage, currentPage, count, allPages))
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

    let books = resultsInAuthors.concat(resultsInNames)
    const currentPage = 1
    const booksPerPage = state.books.booksPerPage
    const offset = 0
    const booksForPage = books.slice(offset, booksPerPage)
    const count = books.length
    const allPages = Math.ceil(count / booksPerPage)

    return dispatch(showBooksList(booksForPage, currentPage, count, allPages))
  }
}

function doSearch(field, value, books) {
  return books.filter(book => {
    if (book[field].toLowerCase().includes(value.toLowerCase())) {
      return book
    }
  })
}

export function search() {
  return (dispatch, getState) => {
    const state = getState()
    let books = doSearch(state.app.filterSettings.searchField, state.app.filterSettings.search, state.books.books)

    const currentPage = 1
    const booksPerPage = state.books.booksPerPage
    const offset = 0
    const booksForPage = books.slice(offset, booksPerPage)
    const count = books.length
    const allPages = Math.ceil(count / booksPerPage)

    return dispatch(showBooksList(booksForPage, currentPage, count, allPages))
  }
}

function doFilter(place, books) {
  return books.filter(book => {
    if (book.place === place) {
      return book
    }
  })
}

export function filter() {
  return (dispatch, getState) => {
    const state = getState()
    let books = doFilter(state.app.filterSettings.filter, state.books.books)

    const currentPage = 1
    const booksPerPage = state.books.booksPerPage
    const offset = 0
    const booksForPage = books.slice(offset, booksPerPage)
    const count = books.length
    const allPages = Math.ceil(count / booksPerPage)

    return dispatch(showBooksList(booksForPage, currentPage, count, allPages))
  }
}

export function setSortTypeAndSort(sortType) {
  return dispatch => {
    dispatch(saveSortValue(sortType))
    dispatch(sort())
  }
}

function doSort(sortType, books) {
  let field = sortTypes.sortTypes[sortType].field
  let up = sortTypes.sortTypes[sortType].up

  return books.sort(function (a, b) {
    if (a[field] > b[field]) {
      return up ? 1 : -1
    }
    if (a[field] < b[field]) {
      return up ? -1 : 1
    }
    // a должно быть равным b
    return 0;
  })
}

export function sort() {
  return (dispatch, getState) => {
    const state = getState()
    let books = doSort(state.app.filterSettings.sortType, state.books.booksShow)

    const currentPage = 1
    const booksPerPage = state.books.booksPerPage
    const offset = 0
    const booksForPage = books.slice(offset, booksPerPage)
    const count = books.length
    const allPages = Math.ceil(count / booksPerPage)

    dispatch(showBooksList(booksForPage, currentPage, count, allPages))
  }
}

function showBooksList(booksForPage, currentPage, count, allPages) {
  return {
    type: FETCH_BOOKS,
    currentPage,
    booksForPage,
    count,
    allPages
  }
}
