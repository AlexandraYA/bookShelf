import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import { createControl, validate } from '../form/formFramework'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import { Alert } from '../components/Alert'
import { createPlace, deletePlace } from '../store/actions/places'


class ManagePlaces extends Component {

  state = {
    newPlace: createControl({
      label: "Название месторасположения книг",
      labelClass: "sr-only",
      errorMessage: "Поле не может быть пустым"
    }, {required: true, minLength: 3}),
    isFormValid: false,
    regim: 'create',
    alert: {
      create: {
        text: "Месторасположение успешно создано.",
        class: "success"
      },
      delete: {
        text: "Месторасположение успешно удалено.",
        class: "danger"
      }
    }
  }

  onSubmitHandler = event => {
    event.preventDefault()
  }

  changeHandler = (value) => {
    let place = {...this.state.newPlace}
    place.value = value
    place.touched = true
    place.valid = validate(place.value, place.validation)

    this.setState({
      newPlace: place,
      isFormValid: place.valid
    })
  }

  deletePlaceHandler = (placeId) => {
    this.props.deletePlace(placeId)

    this.setState({
      regim: 'delete'
    })
  }

  createPlaceHandler = () => {
    if (this.state.newPlace.valid) {

      this.props.createPlace(this.state.newPlace)

      this.setState({
        regim: 'create',
        newPlace: {...this.state.newPlace, value: '', valid: false, touched: false},
        isFormValid: false
      })
    }
  }

  render() {
    const { regim, alert } = this.state

    return (
      <Layout withHeader={true}>
        { this.props.showAlert ? <Alert text={alert[regim].text} className={alert[regim].class} /> : null }
        <div>
          <h2>Управление месторасположениями</h2>
          <div className="row justify-content-center mb-4">
            <div className="col-6">
              <ul className="list-group">
                { this.props.places.map(place => (
                  <li key={place.id} className="list-group-item d-flex justify-content-between">
                    <span>{place.name}</span>
                    <Button
                      onClick={() => this.deletePlaceHandler(place.id)}
                      disabled={false}
                      className="btn btn-danger btn-sm"
                    >
                      Удалить
                    </Button>
                  </li>
                )) }
              </ul>
            </div>
            <div className="col-6">
              <form onSubmit={this.onSubmitHandler}>
                <Input
                  label={this.state.newPlace.label}
                  labelClass={this.state.newPlace.labelClass}
                  value={this.state.newPlace.value}
                  type={this.state.newPlace.type}
                  valid={this.state.newPlace.valid}
                  shouldValidate={!!this.state.newPlace.validation}
                  touched={this.state.newPlace.touched}
                  errorMessage={this.state.newPlace.errorMessage}
                  onChange={event => this.changeHandler(event.target.value)}
                />
                <Button
                    onClick={this.createPlaceHandler}
                    disabled={!this.state.isFormValid}
                    className="btn btn-success btn-lg btn-block"
                  >
                    Сохранить
                  </Button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    places: state.places.places,
    showAlert: state.app.showAlert
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createPlace: place => dispatch(createPlace(place)),
    deletePlace: placeId => dispatch(deletePlace(placeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePlaces)
