import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import { fetchBooks, toPageEditBook, deleteBook } from '../store/actions/books'


class ManageBooks extends Component {

  componentDidMount() {
    this.props.fetchBooks();
  }

  renderRows() {
    return this.props.books.map(book => {
      return (
        <tr key={book.id}>
          <th scope="row">{book.id}</th>
          <td>{book.author}</td>
          <td>{book.name}</td>
          <td>
            <button
              type="button"
              onClick={() => this.props.editBookHandle(book.id, this.props.history)}
              className="btn btn-success btn-sm"
            >
              Ред.
            </button>
          </td>
          <td>
            <button
              type="button"
              onClick={() => this.props.deleteBookHandle(book.id)}
              className="btn btn-danger btn-sm"
            >
              Удалить
            </button>
          </td>
        </tr>
      )
    })
  }

  render() {
    return (
      <Layout withHeader={true}>
        <div>
          <h1>Управление Библиотекой</h1>
          <div className="row justify-content-center mb-4">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Автор</th>
                  <th scope="col">Название</th>
                  <th scope="col"> </th>
                  <th scope="col"> </th>
                </tr>
              </thead>
              <tbody>

                { this.renderRows() }

              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.booksShow
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBooks: () => dispatch(fetchBooks()),
    editBookHandle: (bookId, history) => dispatch(toPageEditBook(bookId, history)),
    deleteBookHandle: bookId => dispatch(deleteBook(bookId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooks)