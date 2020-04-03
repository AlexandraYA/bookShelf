import { CREATE_BOOK, GET_BOOK_BY_ID, MODIFY_BOOKS_LIST, FETCH_BOOKS } from '../actions/actionTypes'


const initialState = {
  books: [
    {
      id: 1,
      author: "Пудин А.С.",
      name: "Воришка храбрый",
      year: "1844",
      place: "полка 1 справа",
      image: "../belka.jpg"
    },
    {
      id: 2,
      author: "Пушкин А.С.",
      name: "Дубровский",
      year: "1834",
      place: "полка 2 справа",
      image: "../belka.jpg"
    },
    {
      id: 3,
      author: "Николаев А.С.",
      name: "Дон Кихот",
      year: "1934",
      place: "полка 1 справа",
      image: "../belka.jpg"
    },
    {
      id: 4,
      author: "Федоров А.С.",
      name: "Фекла Большая",
      year: "1834",
      place: "полка на в шкафу у окна",
      image: "../belka.jpg"
    },
    {
      id: 5,
      author: "Бурунов А.С.",
      name: "Василий Иваныч",
      year: "1804",
      place: "полка внизу справа",
      image: "../belka.jpg"
    },
    {
      id: 6,
      author: "Алимов А.С.",
      name: "Космос",
      year: "1734",
      place: "полка 2 справа",
      image: "../belka.jpg"
    },
    {
      id: 7,
      author: "Рогозин А.С.",
      name: "Косматый мишка",
      year: "1994",
      place: "полка 1 справа",
      image: "../belka.jpg"
    }
  ],
  booksShow: [],
  book: null,
  filterType: '',
  filterValue: '',
  sortType: '',
  sortValue: '',
  searchField: '',
  searchValue: ''
}


export default function booksReducer(state = initialState, action) {

  switch (action.type) {
    case FETCH_BOOKS:
      return {
        ...state,
        booksShow: [...state.books]
      }
    case CREATE_BOOK:
      return {
        ...state,
        books: [...state.books, {...action.newBook, id: state.books.length + 1}]
      }
    case GET_BOOK_BY_ID:
      return {
        ...state,
        book: state.books.find(book => book.id === action.bookId)
      }
    case MODIFY_BOOKS_LIST:
      return {
        ...state,
        booksShow: [...action.books]
      }
    default:
      return state
  }
}