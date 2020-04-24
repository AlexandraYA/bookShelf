import React, {Component} from 'react'
import { connect } from 'react-redux'
import { filter } from '../store/actions/books'
import { saveFilterValue } from '../store/actions/app'
import InlineForm from './InlineForm'


class Filter extends Component {

  startFiltering = (event) => {
    event.preventDefault()
    this.props.filter()
  }

  render() {
    let placesToOptions = Object.values(this.props.places).map(value => {
      return {
        value: value.code,
        text: value.name.rus
      }
    })

    return (
      <InlineForm
        wrappedSelect={false}
        btn={{
          class: "btn-outline-secondary",
          disabled: false,
          text: "Отфильтровать",
          onClick: this.startFiltering
        }}
        select={{
          selectLabel: "Выберите полку",
          defaultValue: this.props.place,
          onChange: event => this.props.changeFilterValue(event.target.value),
          options: placesToOptions
        }}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    places: state.places.places,
    place: state.app.filterSettings.filter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    filter: () => dispatch(filter()),
    changeFilterValue: value => dispatch(saveFilterValue(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)