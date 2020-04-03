import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sort } from '../store/actions/books'
import InlineForm from './InlineForm'


class Sort extends Component {

  state = {
    type: 'authorAZ'
  }

  startSorting = (event) => {
    event.preventDefault()
    this.props.sort(this.state.type);
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
          onChange: event => this.setState({type: event.target.value}),
          options: [{
              text: "по автору А-Я",
              value: "authorAZ"
            },
            {
              text: "по автору Я-А",
              value: "authorZA"
            },
            {
              text: "по названию А-Я",
              value: "nameAZ"
            },
            {
              text: "по названию Я-А",
              value: "nameZA"
            },
            {
              text: "по году по убыванию",
              value: "yearDown"
            },
            {
              text: "по году по возрастанию",
              value: "yearUp"
            }
          ]
        }}
      />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sort: type => dispatch(sort(type))
  }
}

export default connect(null, mapDispatchToProps)(Sort)