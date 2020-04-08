import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import belka from '../belka.jpg'
import { getBookById } from '../store/actions/books'
import Loader from '../components/UI/Loader/Loader'


class BookDetail extends Component {

  componentDidMount() {
    this.props.getBookById(this.props.match.params.id)
  }

  render() {
    return (
      <Layout withHeader={true}>
        <div className="container">
          {
            this.props.book
              ? (
                <div>
                  <h1>{this.props.book.name}</h1>
                  <div className="row">
                    <div className="col-4">
                      <img src={belka} alt="Обложка книги" />
                    </div>
                    <div className="col-8">
                      <ul className="list-group">
                        <li className="list-group-item">
                          <strong>Автор:</strong> {this.props.book.author}
                        </li>
                        <li className="list-group-item">
                          <strong>Год:</strong> {this.props.book.year}
                        </li>
                        <li className="list-group-item">
                          <strong>Месторасположение:</strong> {this.props.book.place}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
              : <Loader />
          }
        </div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    book: state.books.book
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBookById: id => dispatch(getBookById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail)
