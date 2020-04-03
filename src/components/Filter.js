import React, {Component} from 'react'
import { connect } from 'react-redux'
import { filter } from '../store/actions/books'
import InlineForm from './InlineForm'


class Filter extends Component {

  state = {
    place: 'полка 1 справа'
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
          options: [
            {
              text: "полка 1 справа",
              value: "полка 1 справа"
            },
            {
              text: "полка 2 справа",
              value: "полка 2 справа"
            },
            {
              text: "полка на в шкафу у окна",
              value: "полка на в шкафу у окна"
            },
            {
              text: "полка внизу справа",
              value: "полка внизу справа"
            }
          ]
        }}
      />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    filter: place => dispatch(filter(place))
  }
}

export default connect(null, mapDispatchToProps)(Filter)