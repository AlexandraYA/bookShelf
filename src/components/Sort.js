import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sort } from '../store/actions/books'
import { saveSortValue } from '../store/actions/app'
import InlineForm from './InlineForm'


class Sort extends Component {

  startSorting = (event) => {
    event.preventDefault()
    this.props.sort();
  }

  render() {
    return (
      <InlineForm
        wrappedSelect={false}
        btn={{
          class: "btn-outline-success",
          disabled: false,
          text: "Отсортировать",
          onClick: this.startSorting
        }}
        select={{
          selectLabel: "Выберите тип сортировки",
          defaultValue: this.props.sortType,
          onChange: event => this.props.changeSortValue(event.target.value),
          options: this.props.sortTypes
        }}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    sortTypes: state.app.sortTypes,
    sortType: state.app.filterSettings.sortType
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sort: () => dispatch(sort()),
    changeSortValue: value => dispatch(saveSortValue(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort)