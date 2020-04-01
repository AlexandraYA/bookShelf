import { CREATE_BOOK, GET_BOOK_BY_ID, SEARCH_BOOK, FETCH_BOOKS } from './actionTypes'


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

    console.log("value = ", value);
    console.log("field = ", field);

    let findedBooks = state.books.filter(book => {

      console.log("book = ", book.author);
      console.log("book[field] = ", book[field]);

      if (book[field].toLowerCase().includes(value.toLowerCase())) {

        console.log("book included = ", book.author);

        return book
      }
    })



    dispatch(showFindedBooks(findedBooks))
  }
}


function showFindedBooks(findedBooks) {
  return {
    type: SEARCH_BOOK,
    findedBooks
  }
}