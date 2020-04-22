import {
  CREATE_BOOK,
  GET_BOOK_BY_ID,
  FETCH_BOOKS,
  TO_PAGE_EDIT_BOOK,
  EDIT_BOOK,
  DELETE_BOOK,
  SAVE_BOOK_ID
} from '../actions/actionTypes'
import storage from '../../utils/books.json'


const initialState = {
  books: storage.books,
  booksShow: [],
  book: {
    id: null,
    author: '',
    name: '',
    year: '',
    place: '',
    image: ''
  },
  initialBook: {
    id: null,
    author: '',
    name: '',
    year: '',
    place: '',
    image: ''
  },
  filterType: '',
  filterValue: '',
  sortType: '',
  sortValue: '',
  searchField: '',
  searchValue: '',
  bookToDelete: null,
  count: 0,
  currentPage: 1,
  booksPerPage: 10,
  allPages: 0
}


export default function booksReducer(state = initialState, action) {

  switch (action.type) {
    case FETCH_BOOKS:
      return {
        ...state,
        booksShow: action.booksForPage,
        count: action.count,
        currentPage: action.currentPage,
        allPages: action.allPages
      }
    case CREATE_BOOK:
      return {
        ...state,
        books: [...action.books],
        booksShow: [...action.books]
      }
    case GET_BOOK_BY_ID:
      return {
        ...state,
        book: state.books.find(book => book.id === action.bookId)
      }
    case SAVE_BOOK_ID:
      return {
        ...state,
        bookToDelete: action.bookId
      }
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book.id !== state.bookToDelete),
        booksShow: state.booksShow.filter(book => book.id !== state.bookToDelete),
        bookToDelete: null
      }
    case TO_PAGE_EDIT_BOOK:
      return {
        ...state,
        book: state.books.find(book => book.id === action.bookId)
      }
    case EDIT_BOOK:
      return {
        ...state,
        book: { ...state.initialBook },
        books: [...action.editedBooks],
        booksShow: [...action.editedBooks]
      }
    default:
      return state
  }
}