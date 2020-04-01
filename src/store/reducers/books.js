import { CREATE_BOOK, GET_BOOK_BY_ID } from '../actions/actionTypes'


const initialState = {
  books: [
    {
      id: 1,
      author: "Пушкин А.С.",
      name: "Дубровский",
      year: "1834",
      place: "шкаф справа полка левая верхняя",
      image: "../belka.jpg"
    },
    {
      id: 2,
      author: "Пушкин А.С.",
      name: "Дубровский",
      year: "1834",
      place: "шкаф справа полка левая верхняя",
      image: "../belka.jpg"
    },
    {
      id: 3,
      author: "Пушкин А.С.",
      name: "Дубровский",
      year: "1834",
      place: "шкаф справа полка левая верхняя",
      image: "../belka.jpg"
    },
    {
      id: 4,
      author: "Пушкин А.С.",
      name: "Дубровский",
      year: "1834",
      place: "шкаф справа полка левая верхняя",
      image: "../belka.jpg"
    },
    {
      id: 5,
      author: "Пушкин А.С.",
      name: "Дубровский",
      year: "1834",
      place: "шкаф справа полка левая верхняя",
      image: "../belka.jpg"
    },
    {
      id: 6,
      author: "Пушкин А.С.",
      name: "Дубровский",
      year: "1834",
      place: "шкаф справа полка левая верхняя",
      image: "../belka.jpg"
    },
    {
      id: 7,
      author: "Пушкин А.С.",
      name: "Дубровский",
      year: "1834",
      place: "шкаф справа полка левая верхняя",
      image: "../belka.jpg"
    }
  ],
  book: null,
  filterType: '',
  filterValue: '',
  sortType: '',
  sortValue: '',
  searchField: '',
  searchValue: ''
}


export default function booksReducer(state = initialState, action) {

  console.log("state = ", state);
  console.log("action = ", action);

  switch (action.type) {
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
    default:
      return state
  }
}