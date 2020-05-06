import React from 'react'
import { connect } from 'react-redux'
import { Navbar } from './Navbar/Navbar'
import Modal from './Modal'
import { changeLocale } from '../store/actions/app'


const Layout = props => {
  return (
    <div className="flex-grow-1 bg-light">
      { props.withHeader && <header>
        <Navbar
          changeLocaleHandle={props.changeLocale}
          currentLocale={props.locale}
        />
      </header>
      }
      <div className="container-fluid pt-5">
        { props.children }
      </div>
      { props.showModal ? <Modal /> : null }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    showModal: state.app.showModal,
    locale: state.app.locale
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeLocale: () => dispatch(changeLocale())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);