import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IconTrash, IconPencil } from '../components/UI/icons'
import { ButtonUp, ButtonDown } from '../components/UI/CaretButtons'
import Layout from '../components/Layout'
import Pagination from '../components/Pagination'
import { Alert } from '../components/Alert'
import {
  setPageType,
  fetchBooks,
  toPageEditBook,
  beforeDeleteBook,
  setSortTypeAndSort,
  filter,
  searchIntoAllFields
} from '../store/actions/books'
import { resetFilterSettings, saveFilterValue, saveSearchValue } from '../store/actions/app'
import places from '../data/places.json'
import pageTypes from '../data/pageTypes.json'


class ManageBooks extends Component {

  state = {
    sortAuthorUp: false,
    sortNameUp: false,
    sortYearUp: false
  }

  componentDidMount() {
    this.props.setPageType(pageTypes.OTHER)
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
          <td>{book.author.rus}</td>
          <td>{book.name.rus}</td>
          <td>{places[book.place].name.rus}</td>
          <td>{book.year}</td>
          <td>
            <button
              type="button"
              onClick={() => this.props.editBookHandle(book.id, this.props.history)}
              className="btn btn-success btn-sm mr-1 mb-1"
            >
              <IconPencil />
            </button>
            <button
              type="button"
              onClick={() => this.props.deleteBookHandle(book.id, book.name.rus)}
              className="btn btn-danger btn-sm mb-1"
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
          { this.props.showAlert ? <Alert text="Ничего не найдено" className="danger" /> : null }
          <div className="row mt-4">
            <div className="col-auto mb-3">
              <form className="form-inline" onSubmit={this.onSubmitHandler}>
                <div className="mr-2">
                  <select
                  className="custom-select"
                  value={this.props.defaultFilter}
                  onChange={event => this.props.changeFilterValue(event.target.value)}>
                    <option value="">Выберите полку</option>
                    {
                      Object.values(this.props.places).length
                      ? Object.values(this.props.places).map(place => (
                        <option key={place.name.rus + place.id} value={place.code}>{place.name.rus}</option>
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
                <div className="form-group mr-2 mb-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Что будем искать?"
                    value={this.props.search}
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
                      ? <ButtonUp onClick={() => this.sortAuthor("authorAZ")} />
                      : <ButtonDown onClick={() => this.sortAuthor("authorZA")} />
                    }
                    Автор
                  </th>
                  <th scope="col">
                    {
                      this.state.sortNameUp
                      ? <ButtonUp onClick={() => this.sortName("nameAZ")} />
                      : <ButtonDown onClick={() => this.sortName("nameZA")} />
                    }
                    Название
                  </th>
                  <th scope="col">Полка</th>
                  <th scope="col">
                    {
                      this.state.sortYearUp
                      ? <ButtonUp onClick={() => this.sortYear("yearDown")} />
                      : <ButtonDown onClick={() => this.sortYear("yearUp")} />
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
    places: state.places.places,
    defaultFilter: state.app.filterSettings.filter,
    showAlert: state.app.showAlert,
    search: state.app.filterSettings.search
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPageType: type => dispatch(setPageType(type)),
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