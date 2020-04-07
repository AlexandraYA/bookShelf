import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'


class ManageBooks extends Component {

  renderRows() {
    return this.props.books.map(book => {
      return (
        <tr>
          <th scope="row">{book.id}</th>
          <td>{book.author}</td>
          <td>{book.name}</td>
          <td>
            <button type="button" className="btn btn-success btn-sm">Ред.</button>
          </td>
          <td>
            <button type="button" className="btn btn-danger btn-sm">Удалить</button>
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
            <table class="table">
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

export default connect(mapStateToProps)(ManageBooks)