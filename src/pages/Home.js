import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import SettingsBlock from '../components/SettingsBlock/SettingsBlock'
import { Card } from '../components/Card'
import { fetchBooks } from '../store/actions/books'
import belka from '../belka.jpg'


class Home extends Component {

  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    return (
      <Layout withHeader={true}>
        <div>
          <h1>Все книги здесь</h1>

          <SettingsBlock />

          <div className="row">
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
    fetchBooks: () => dispatch(fetchBooks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);