import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from '../components/Card'
import { Search } from '../components/Search'
import { Filter } from '../components/Filter'
import { Sort } from '../components/Sort'
import belka from '../belka.jpg'


class Home extends Component {

  render() {
    return (
      <div>
        <h1>Все книги здесь</h1>
        <div className="row justify-content-center mb-4">
          <div className="col-6">
            <Search />
          </div>
        </div>
        <div className="row justify-content-center mb-4">
          <div className="col-6">
            <Filter />
          </div>
        </div>
        <div className="row justify-content-center mb-4">
          <div className="col-6">
            <Sort />
          </div>
        </div>
        <div className="row">
          { this.props.books.map((book, index) => {
            return (
              <div
                key={book.id + index}
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
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books
  }
}

export default connect(mapStateToProps)(Home);