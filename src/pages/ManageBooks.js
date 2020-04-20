import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IconCaretUp } from '../components/UI/IconCaretUp'
import { IconCaretDown } from '../components/UI/IconCaretDown'
import { IconPencil } from '../components/UI/IconPencil'
import { IconTrash } from '../components/UI/IconTrash'
import Layout from '../components/Layout'
import Pagination from '../components/Pagination'
import { fetchBooks, toPageEditBook, beforeDeleteBook, setSortTypeAndSort, filter, searchIntoAllFields } from '../store/actions/books'
import { resetFilterSettings, saveFilterValue, saveSearchValue } from '../store/actions/app'


class ManageBooks extends Component {

  state = {
    sortAuthorUp: false,
    sortNameUp: false,
    sortYearUp: false
  }

  componentDidMount() {
    this.props.fetchBooks();
  }

  onSubmitHandler = event => {
    event.preventDefault()
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
              className="btn btn-success btn-sm mr-1"
            >
              <IconPencil />
            </button>
            <button
              type="button"
              onClick={() => this.props.deleteBookHandle(book.id)}
              className="btn btn-danger btn-sm"
            >
              <IconTrash />
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
          <div className="row mt-4">
            <div className="col-auto">
              <form className="form-inline" onSubmit={this.onSubmitHandler}>
                <div>
                  <select
                  className="custom-select mr-sm-2" 
                  onChange={event => this.props.changeFilterValue(event.target.value)}>
                    <option>Выберите полку</option>
                    {
                      this.props.places.length
                      ? this.props.places.map(place => (
                        <option key={place.name + place.id} value={place.name}>{place.name}</option>
                      ))
                      : <option disabled>Нет полок</option>
                    }
                  </select>
                </div>
                <button
                  type="submit"
                  onClick={() => {this.props.filter()}}
                  className="btn btn-outline-info"
                >
                  Отфильтровать
                </button>
              </form>
            </div>
            <div className="col-auto">
              <form className="form-inline" onSubmit={this.onSubmitHandler}>
                <div className="form-group mx-sm-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Что будем искать?"
                    onChange={event => this.props.changeSearchValue(event.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  onClick={event => {this.props.searchIntoAllFields(event.target.value)}}
                  className="btn btn-outline-primary"
                >
                  Найти
                </button>
              </form>
            </div>
            <div className="col-auto">
              <button type="submit" onClick={() => {this.props.reset()}} className="btn btn-outline-danger">Сбросить</button>
            </div>
          </div>
          <div className="row justify-content-center mt-4">
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
                      /*TODO do own button component for sort btn with icon caret  */
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
                </tr>
              </thead>
              <tbody>

                { this.renderRows() }

              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={1}
            allPages={1}
          />
        </div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.booksShow,
    places: state.places.places
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBooks: () => dispatch(fetchBooks()),
    editBookHandle: (bookId, history) => dispatch(toPageEditBook(bookId, history)),
    deleteBookHandle: bookId => dispatch(beforeDeleteBook(bookId)),
    setSortTypeAndSort: sortType => dispatch(setSortTypeAndSort(sortType)),
    changeFilterValue: value => dispatch(saveFilterValue(value)),
    filter: () => dispatch(filter()),
    changeSearchValue: value => dispatch(saveSearchValue(value)),
    searchIntoAllFields: value => dispatch(searchIntoAllFields(value)),
    reset: () => dispatch(resetFilterSettings())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooks)