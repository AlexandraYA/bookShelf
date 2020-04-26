import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import { createControl, validate, validateForm } from '../form/formFramework'
import Input from '../components/UI/Input'
import Select from '../components/UI/Select'
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
    rusAuthor: createTextInputControl("Автор (по-русски)"),
    engAuthor: createTextInputControl("Автор (по-английски)"),
    rusName: createTextInputControl("Название (по-русски)"),
    engName: createTextInputControl("Название (по-английски)"),
    year: createTextInputControl("Год издания")
  };
};

class CreateBook extends Component {

  state = {
    isFormValid: false,
    formControls: createFormControls(),
    image: createControl({
      label: "Фотография обложки",
      type: "file",
      errorMessage: "Загрузите фотографию обложки"
    }, {required: true}),
    placeCode: ''
  }

  constructor(props) {
    super(props)

    this.uploadFileHandler.bind(this)
  }

  componentDidMount() {
    this.setState({
      placeCode: Object.keys(this.props.places).length ? Object.keys(this.props.places)[0] : ''
    })
  }

  onSubmitHandler = event => {
    event.preventDefault()
  }

  addBookHandler = event => {
    event.preventDefault()

    const {rusAuthor, engAuthor, rusName, engName, year} = this.state.formControls;

    const book = {
      author: {
        rus: rusAuthor.value,
        eng: engAuthor.value
      },
      name: {
        rus: rusName.value,
        eng: engName.value
      },
      year: year.value,
      place: this.state.placeCode,
      image: this.state.image.value
    }

    this.props.createBook(book, this.props.history)

    this.setState({
      isFormValid: false,
      formControls: createFormControls(),
      image: createControl({
        label: "Фотография обложки",
        type: "file",
        errorMessage: "Загрузите фотографию обложки"
      }, {required: true}),
      placeCode: Object.keys(this.props.places)[0]
    });
  }

  changeHandler = (controlValue, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.touched = true;
    control.value = controlValue;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    });
  }

  selectChangeHandler = (value) => {
    this.setState({
      placeCode: value
    })
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

  uploadFileHandler = (event) => {
    const image = {...this.state.image}

    image.touched = true
    image.value = URL.createObjectURL(event.target.files[0])
    image.valid = validate(image.value, image.validation)

    this.setState({
      image
    })
  }

  render() {
    const select = <Select
          label="Месторасположение"
          value={this.state.placeCode}
          onChange={event => this.selectChangeHandler(event.target.value)}
          options={Object.values(this.props.places).map(place => {
                    return {
                      text: place.name.rus,
                      value: place.code
                    }
                  })}
        />

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

                  { select }

                  <Input
                    label={this.state.image.label}
                    labelClass={this.state.image.labelClass}
                    type="file"
                    valid={this.state.image.valid}
                    shouldValidate={!!this.state.image.validation}
                    touched={this.state.image.touched}
                    errorMessage={this.state.image.errorMessage}
                    onChange={this.uploadFileHandler}
                  />

                  <div className="mb-2">
                    { this.state.image.value
                        ? <img style={{width: '200px', height: '200px'}} src={this.state.image.value} alt="preview" />
                        : null
                    }
                  </div>

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
    showAlert: state.app.showAlert,
    places: state.places.places
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createBook: (newBook, history) => dispatch(addBookToLibrary(newBook, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBook)