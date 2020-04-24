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
import sortTypes from '../../data/sortTypes.json'


export function fetchBooks(page = null) {
  return (dispatch, getState) => {
    const state = getState()
    let books = getBooksTreated(state.app.filterSettings, state.books.books, dispatch)

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

export function beforeDeleteBook(bookId, bookName) {
  return (dispatch, getState) => {
    dispatch({
      type: SAVE_BOOK_ID,
      bookId
    })
    dispatch(showModal({
      title: 'Удаление книги ' + bookName,
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
    let books = getBooksTreated(state.app.filterSettings, state.books.books, dispatch)

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
    if (book[field].rus.toLowerCase().includes(value.toLowerCase())) {
      return book
    }
  })
}

export function search() {
  return (dispatch, getState) => {
    const state = getState()
    let books = getBooksTreated(state.app.filterSettings, state.books.books, dispatch, state.app.filterSettings.searchField)

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
    let books = getBooksTreated(state.app.filterSettings, state.books.books, dispatch)

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

  if (field === 'year') {
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
  } else {
    return books.sort(function (a, b) {
      if (a[field].rus > b[field].rus) {
        return up ? 1 : -1
      }
      if (a[field].rus < b[field].rus) {
        return up ? -1 : 1
      }
      // a должно быть равным b
      return 0;
    })
  }
}

export function sort() {
  return (dispatch, getState) => {
    const state = getState()
    let books = getBooksTreated(state.app.filterSettings, state.books.books, dispatch)

    const currentPage = 1
    const booksPerPage = state.books.booksPerPage
    const offset = 0
    const booksForPage = books.slice(offset, booksPerPage)
    const count = books.length
    const allPages = Math.ceil(count / booksPerPage)

    dispatch(showBooksList(booksForPage, currentPage, count, allPages))
  }
}

function getBooksTreated(filterSettings, stateBooks, dispatch, field = null) {
  let books = []

  if (filterSettings.search.length) {
    if (field) {
      books = doSearch(field, filterSettings.search, stateBooks)
    } else {
      books = doSearch('author', filterSettings.search, stateBooks)
      let books2 = doSearch('name', filterSettings.search, stateBooks)
      if (books2.length) {
        books = books.concat(books2)
      }
    }

    if (!books.length) {
      dispatch(showAlert())

      let setTimeoutId = setTimeout(() => {
        dispatch(hideAlert())
        clearTimeout(setTimeoutId)
      }, 2000)
    }
  }

  if (filterSettings.filter.length) {
    const startBooksArr = books.length ? books : stateBooks
    books = doFilter(filterSettings.filter, startBooksArr)
  }

  if (filterSettings.sortType.length) {
    const startBooksArr = books.length ? books : stateBooks
    books = doSort(filterSettings.sortType, startBooksArr)
  }

  return books.length ? books : stateBooks
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
