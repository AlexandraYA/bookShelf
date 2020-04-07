import React from 'react'
import { Navbar } from './Navbar'


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
    </div>
  )
}

export default Layout;