import React, { Component } from 'react'
import { connect } from 'react-redux'
import InlineForm from './InlineForm'
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

      <InlineForm
        wrappedSelect={true}
        btn={{
          class: "btn-outline-info",
          disabled: false,
          text: "Найти",
          onClick: this.startSearching
        }}
        select={{
          onChange: event => this.setState({field: event.target.value}),
          options: [{
            text: "по автору",
            value: "author"
          },{
            text: "по названию книги",
            value: "name"
          }]
        }}
        input={{
          onChange: event => this.setState({value: event.target.value}),
          value: this.state.value,
          placeholder: "Введите слово..."
        }}
      />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    search: (field, value) => dispatch(search(field, value))
  }
}

export default connect(null, mapDispatchToProps)(Search)