import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import belka from '../belka.jpg'
import { getBookById } from '../store/actions/books'
import Loader from '../components/UI/Loader/Loader'
import places from '../data/places.json'
import { getWordByLocale } from '../locale'


class BookDetail extends Component {

  componentDidMount() {
    this.props.getBookById(this.props.match.params.id)
  }

  render() {
    const bookPlace = this.props.book.place
    return (
      <Layout withHeader={true}>
        <div className="container">
          {
            this.props.book
              ? (
                <div>
                  <h1 className="mb-5">{this.props.book.name[this.props.locale]}</h1>
                  <div className="row">
                    <div className="col-4">
                      <img
                        src={this.props.book.image ? this.props.book.image : belka}
                        alt={ getWordByLocale('bookCover', this.props.locale) }
                      />
                    </div>
                    <div className="col-8">
                      <ul className="list-group">
                        <li className="list-group-item">
                          <strong>{ getWordByLocale('author', this.props.locale) }</strong>
                          {this.props.book.author[this.props.locale]}
                        </li>
                        <li className="list-group-item">
                          <strong>{ getWordByLocale('yearBookPublic', this.props.locale) }</strong>
                          {this.props.book.year}
                        </li>
                        <li className="list-group-item">
                          <strong>{ getWordByLocale('bookPlace', this.props.locale) }</strong>
                          {bookPlace ? places[bookPlace].name[this.props.locale] : ""}
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
    book: state.books.book,
    locale: state.app.locale
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBookById: id => dispatch(getBookById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail)
