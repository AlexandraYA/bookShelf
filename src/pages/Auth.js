import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import is from 'is_js';
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import Layout from '../components/Layout'


const settings = {
  pages: {
    login: {
      btnText: 'Войти'
    },
    register: {
      btnText: 'Зарегистрироваться'
    }
  }
}

class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        labelClass: "sr-only",
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        labelClass: "sr-only",
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    },
    regim: 'login'
  }

  onFormSubmit(event) {
    event.preventDefault()
  }

  toggleRegim = (event) => {
    event.preventDefault()
    this.setState({
      regim: this.state.regim === 'login' ? 'register' : 'login'
    })
  }

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
  };

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  };

  onChangeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls, isFormValid
    });
  };

  renderInputs() {
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
            onChange={event => this.onChangeHandler(event.target.value, controlName)}
          />
      );
    });
  }

  render() {
    return (
      <Layout>
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-10 col-lg-4">
            <div className="shadow-sm bg-white rounded p-5">
              <h3 className="text-center mb-4">Домашняя библиотека</h3>
              <form onSubmit={this.onFormSubmit} className="mb-4">

                { this.renderInputs() }

                <Link to={"/"} >
                  <Button
                    className='btn btn-primary btn-lg btn-block'
                    onClick={this.login}
                    disabled={!this.state.isFormValid}>
                    { settings.pages[this.state.regim].btnText }
                  </Button>
                </Link>
              </form>
              <div className="text-center">
                <a href="/" onClick={this.toggleRegim}>{ this.state.regim === 'login' ? 'Зарегистрироваться' : 'Войти' }</a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Auth