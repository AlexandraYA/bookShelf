import React from 'react'
import { connect } from 'react-redux'
import { Navbar } from './Navbar/Navbar'
import Modal from './Modal'


const Layout = props => {
  return (
    <div className="flex-grow-1 bg-light">
      { props.withHeader && <header>
        <Navbar />
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
    showModal: state.app.showModal
  }
}

export default connect(mapStateToProps)(Layout);