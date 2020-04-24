import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import SettingsBlock from '../components/SettingsBlock/SettingsBlock'
import { Card } from '../components/Card'
import Loader from '../components/UI/Loader/Loader'
import { fetchBooks } from '../store/actions/books'
import belka from '../belka.jpg'
import { Alert } from '../components/Alert'


class Home extends Component {

  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {

    if (!this.props.books.length && this.props.loading) {
      return (
        <Loader />
      )
    }

    return (
      <Layout withHeader={true}>
        <div>
          <h1>Все книги здесь</h1>
          { this.props.showAlert ? <Alert text="Ничего не найдено" className="danger" /> : null }

          <SettingsBlock />

          <div
            ref={loadingRef => (this.loadingRef = loadingRef)}
            className="row"
          >
            { this.props.books.map((book, index) => {
              return (
                <div
                  key={`${book.id}-${Math.random()}`}
                  className="col-sm-4">
                  <Card
                    book={book}
                    image={belka}
                  />
                </div>
              )
            }) }

            {this.props.loading ? <Loader /> : null}
          </div>
        </div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.app.loading,
    books: state.books.booksShow,
    showAlert: state.app.showAlert
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBooks: () => dispatch(fetchBooks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);