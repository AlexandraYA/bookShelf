import React, {Component} from 'react'
import { connect } from 'react-redux'
import { filter } from '../store/actions/books'
import InlineForm from './InlineForm'


class Filter extends Component {

  state = {
    place: null,
    places: []
  }

  componentDidMount() {

    const places = this.props.places.map(place => {
      return {text: place.name, value: place.name}
    })

    this.setState({
      place: places[0].value,
      places: places
    })
  }

  startFiltering = (event) => {
    event.preventDefault()
    this.props.filter(this.state.place)
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
          onChange: event => this.setState({place: event.target.value}),
          options: this.state.places
        }}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    places: state.places.places
  }
}

function mapDispatchToProps(dispatch) {
  return {
    filter: place => dispatch(filter(place))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)