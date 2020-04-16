import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IconCaretUp } from '../components/UI/IconCaretUp'
import { IconCaretDown } from '../components/UI/IconCaretDown'
import Layout from '../components/Layout'
import { fetchBooks, toPageEditBook, deleteBook, setSortTypeAndSort } from '../store/actions/books'


class ManageBooks extends Component {

  state = {
    sortAuthorUp: false,
    sortNameUp: false,
    sortYearUp: false
  }

  componentDidMount() {
    this.props.fetchBooks();
  }

  sortAuthor = (sortType) => {
    this.props.setSortTypeAndSort(sortType)
    this.setState({
      sortAuthorUp: !this.state.sortAuthorUp
    })
  }

  sortName = (sortType) => {
    this.props.setSortTypeAndSort(sortType)
    this.setState({
      sortNameUp: !this.state.sortNameUp
    })
  }

  sortYear = (sortType) => {
    this.props.setSortTypeAndSort(sortType)
    this.setState({
      sortYearUp: !this.state.sortYearUp
    })
  }

  renderRows() {
    return this.props.books.map(book => {
      return (
        <tr key={book.id}>
          <th scope="row">{book.id}</th>
          <td>{book.author}</td>
          <td>{book.name}</td>
          <td>{book.place}</td>
          <td>{book.year}</td>
          <td>
            <button
              type="button"
              onClick={() => this.props.editBookHandle(book.id, this.props.history)}
              className="btn btn-light btn-sm"
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
                  <th scope="col">
                    {
                      this.state.sortAuthorUp
                      ? <button
                          type="button"
                          onClick={() => this.sortAuthor("authorAZ")}
                          className="btn btn-light btn-sm mr-1"
                        >
                          <IconCaretUp />
                        </button>
                      : <button
                          type="button"
                          onClick={() => this.sortAuthor("authorZA")}
                          className="btn btn-light btn-sm mr-1"
                        >
                          <IconCaretDown />
                        </button>
                    }
                    Автор
                  </th>
                  <th scope="col">
                    {
                      this.state.sortNameUp
                      ? <button
                          type="button"
                          onClick={() => this.sortName("nameAZ")}
                          className="btn btn-light btn-sm mr-1"
                        >
                          <IconCaretUp />
                        </button>
                      : <button
                          type="button"
                          onClick={() => this.sortName("nameZA")}
                          className="btn btn-light btn-sm mr-1"
                        >
                          <IconCaretDown />
                        </button>
                    }
                    Название
                  </th>
                  <th scope="col">Полка</th>
                  <th scope="col">
                    {
                      this.state.sortYearUp
                      ? <button
                          type="button"
                          onClick={() => this.sortYear("yearDown")}
                          className="btn btn-light btn-sm mr-1"
                        >
                          <IconCaretUp />
                        </button>
                      : <button
                          type="button"
                          onClick={() => this.sortYear("yearUp")}
                          className="btn btn-light btn-sm mr-1"
                        >
                          <IconCaretDown />
                        </button>
                    }
                    Год
                  </th>
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
    deleteBookHandle: bookId => dispatch(deleteBook(bookId)),
    setSortTypeAndSort: sortType => dispatch(setSortTypeAndSort(sortType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooks)