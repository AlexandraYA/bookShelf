import React, { Component } from 'react'
import { connect } from 'react-redux'
import InlineForm from './InlineForm'
import { search } from '../store/actions/books'
import { saveSearchValue, saveSearchFieldValue } from '../store/actions/app'


class Search extends Component {

  startSearching = (event) => {
    event.preventDefault()
    this.props.search();
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
          defaultValue: this.props.field,
          onChange: event => this.props.changeSearchFieldValue(event.target.value),
          options: [{
            text: "по автору",
            value: "author"
          },{
            text: "по названию книги",
            value: "name"
          }]
        }}
        input={{
          onChange: event => this.props.changeSearchValue(event.target.value),
          value: this.props.value,
          placeholder: "Введите слово..."
        }}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    field: state.app.filterSettings.searchField,
    value: state.app.filterSettings.search
  }
}

function mapDispatchToProps(dispatch) {
  return {
    search: () => dispatch(search()),
    changeSearchValue: value => dispatch(saveSearchValue(value)),
    changeSearchFieldValue: value => dispatch(saveSearchFieldValue(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)