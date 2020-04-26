import {
  CREATE_BOOK,
  GET_BOOK_BY_ID,
  FETCH_BOOKS,
  CONTINUE_LIST,
  TO_PAGE_EDIT_BOOK,
  EDIT_BOOK,
  DELETE_BOOK,
  SAVE_BOOK_ID,
  SET_PAGE_TYPE
} from './actionTypes'
import { showLoader, hideLoader, showAlert, hideAlert, showModal, saveSortValue } from './app'
import sortTypes from '../../data/sortTypes.json'
import pageTypes from '../../data/pageTypes.json'


export function fetchBooks(page = null) {
  return (dispatch, getState) => {
    dispatch(showLoader())

    const state = getState()
    let books = getBooksTreated(state.app.filterSettings, state.books.books, dispatch)
    const currentPage = page || 1
    const homeBooks = page === 1 ? [] : state.books.homeBooks

    dispatch(showBooksList(books, currentPage, state.books.booksPerPage, books.length, state.books.pageType, homeBooks))
    return dispatch(hideLoader())
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
    return dispatch(showBooksList(
      books,
      1,
      state.books.booksPerPage,
      books.length,
      state.books.pageType,
      []
    ))
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
    return dispatch(showBooksList(
      books,
      1,
      state.books.booksPerPage,
      books.length,
      state.books.pageType,
      []
    ))
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
    return dispatch(showBooksList(
      books,
      1,
      state.books.booksPerPage,
      books.length,
      state.books.pageType,
      []
    ))
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
    return dispatch(showBooksList(
      books,
      1,
      state.books.booksPerPage,
      books.length,
      state.books.pageType,
      []
    ))
  }
}

export function setPageType(pageType) {
  return {
    type: SET_PAGE_TYPE,
    pageType
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
    books = doSort(filterSettings.sortType, [...startBooksArr])
  }

  return books.length ? books : stateBooks
}

function showBooksList(books, currentPage, booksPerPage, count, pageType = pageTypes.HOME, homeBooks = []) {

  const offset = booksPerPage * (currentPage - 1)
  const booksForPage = books.slice(offset, offset + booksPerPage)

  if (pageType === pageTypes.HOME) {
    return {
      type: CONTINUE_LIST,
      books: homeBooks.concat(booksForPage),
      currentPage,
      count,
      allPages: Math.ceil(count / booksPerPage)
    }
  } else {
    return {
      type: FETCH_BOOKS,
      currentPage,
      booksForPage,
      count,
      allPages: Math.ceil(count / booksPerPage)
    }
  }
}
