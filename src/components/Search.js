import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from './UI/Button'
import { search } from '../store/actions/books'


class Search extends Component {

  state = {
    field: 'author',
    value: ''
  }

  onSubmitHandler = event => {
    event.preventDefault()
  }

  startSearching = (event) => {
    event.preventDefault()
    this.props.search(this.state.field, this.state.value);
  }

  render () {
    return (
      <form onSubmit={this.onSubmitHandler}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <select
              className="custom-select" 
              defaultValue="author"
              onChange={event => this.setState({field: event.target.value})}
            >
              <option value="author">по автору</option>
              <option value="name">по названию книги</option>
            </select>
          </div>
          <input
          type="text" 
          className="form-control"
          onChange={event => this.setState({value: event.target.value})}
          value={this.state.vlalue}
          placeholder="Введите слово..." />
          <div className="input-group-append">
            <Button
              className="btn btn-outline-info"
              disabled={false}
              onClick={this.startSearching}
            >
              Найти
            </Button>
          </div>
        </div>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    search: (field, value) => dispatch(search(field, value))
  }
}

export default connect(null, mapDispatchToProps)(Search)