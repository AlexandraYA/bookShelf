import React, {Component} from 'react'
import { connect } from 'react-redux'
import { filter } from '../store/actions/books'
import { saveFilterValue } from '../store/actions/app'
import InlineForm from './InlineForm'


class Filter extends Component {

  state = {
    places: []
  }

  componentDidMount() {
    const places = this.props.places.map(place => {
      return {text: place.name, value: place.name}
    })

    this.setState({
      places: places
    })
  }

  startFiltering = (event) => {
    event.preventDefault()
    this.props.filter()
  }

  resetFilter() {
    this.props.resetSettings()
  }

  render() {
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
          options: this.state.places
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