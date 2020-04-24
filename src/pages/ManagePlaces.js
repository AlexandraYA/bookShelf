import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import { createControl, validate, validateForm } from '../form/formFramework'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import { Alert } from '../components/Alert'
import { IconTrash } from '../components/UI/icons'
import { createPlace, deletePlace, beforeDeletePlace } from '../store/actions/places'


function createTextInputControl(label) {
  return createControl({
    label: label,
    labelClass: "sr-only",
    errorMessage: "Минимальная длина 3 символа"
  }, {required: true, minLength: 3});
};

function createFormControls() {
  return {
    rusName: createTextInputControl("Название на русском"),
    engName: createTextInputControl("Название на английском"),
    code: createTextInputControl("Код")
  };
};

class ManagePlaces extends Component {

  state = {
    formControls: createFormControls(),
    isFormValid: false,
    regim: "create",
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

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = value
    control.touched = true
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  deletePlaceHandler = () => {
    this.props.deletePlace()
  }

  openDeleteModal = (placeCode, placeName) => {
    this.props.beforeDeletePlace(placeCode, placeName)
  }

  createPlaceHandler = event => {
    event.preventDefault()

    const {rusName, engName, code} = this.state.formControls;

    const place = {
      rusName: rusName.value,
      engName: engName.value,
      code: code.value
    }

    this.props.createPlace(place)

    this.setState({
      regim: 'create',
      formControls: createFormControls(),
      isFormValid: false
    })
  }

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]

      return (
          <Input
            key={controlName + index}
            label={control.label}
            labelClass={control.labelClass}
            value={control.value}
            type={control.type}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler(event.target.value, controlName)}
          />
      );
    });
  }

  render() {
    const { regim, alert } = this.state

    return (
      <Layout withHeader={true}>
        { this.props.showAlert ? <Alert text={alert[regim].text} className={alert[regim].class} /> : null }
        <div>
          <h1 className="mb-5">Управление месторасположениями</h1>
          <div className="row justify-content-center mb-4">
            <div className="col-6">
              <ul className="list-group">
                { Object.values(this.props.places).map(place => (
                  <li key={place.code} className="list-group-item d-flex justify-content-between">
                    <span>{place.name.rus}</span>
                    <Button
                      onClick={() => this.openDeleteModal(place.code, place.name.rus)}
                      disabled={false}
                      className="btn btn-danger btn-sm"
                    >
                      <IconTrash />
                    </Button>
                  </li>
                )) }
              </ul>
            </div>
            <div className="col-6">
              <form onSubmit={this.onSubmitHandler}>

                { this.renderInputs() }

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
    deletePlace: placeId => dispatch(deletePlace(placeId)),
    beforeDeletePlace: placeId => dispatch(beforeDeletePlace(placeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePlaces)
