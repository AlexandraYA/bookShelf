import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import { createControl, validate, validateForm } from '../form/formFramework'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import { addBookToLibrary } from '../store/actions/books'
import { Alert } from '../components/Alert'


function createTextInputControl(label) {
  return createControl({
    label: label,
    labelClass: "sr-only",
    errorMessage: "Поле не может быть пустым"
  }, {required: true});
};

function createFormControls() {
  return {
    author: createTextInputControl("Автор"),
    name: createTextInputControl("Название"),
    year: createTextInputControl("Год издания"),
    place: createTextInputControl("Месторасположение"),
    image: createControl({
      label: "Фотография обложки",
      type: "file",
      errorMessage: "Загрузите фотографию обложки"
    }, {required: true})
  };
};

class CreateBook extends Component {

  state = {
    isFormValid: false,
    formControls: createFormControls()
  }

  onSubmitHandler = event => {
    event.preventDefault()
  }

  addBookHandler = event => {
    event.preventDefault()

    const {author, name, year, place, image} = this.state.formControls;

    const book = {
      author: author.value,
      name: name.value,
      year: year.value,
      place: place.value,
      image: image.value
    }

    this.props.createBook(book, this.props.history)

    this.setState({
      isFormValid: false,
      formControls: createFormControls()
    });
  }

  changeHandler = (controlValue, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = controlValue;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    });
  }

  renderControls() {
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
    return (
      <Layout withHeader={true}>
        { this.props.showAlert ? <Alert text={"Книга успешно создана."} className="success" /> : null }
        <div>
          <div className="mb-4">
            <h2 className="text-center">Добавить книгу</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-12 col-md-10 col-lg-5">
              <div className="shadow-sm bg-white rounded p-5">
                <form onSubmit={this.onSubmitHandler}>

                  { this.renderControls() }

                  <Button
                    onClick={this.addBookHandler}
                    disabled={!this.state.isFormValid}
                    className="btn btn-success btn-lg btn-block"
                  >
                    Сохранить
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    showAlert: state.app.showAlert
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createBook: (newBook, history) => dispatch(addBookToLibrary(newBook, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBook)