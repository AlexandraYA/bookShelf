import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IconSignOut } from '../UI/icons'
import classes from './Navbar.module.css'


export const Navbar = () => {

  const [openNav, setOpenNav] = useState(false)
  const cls = ["position-fixed", "navbar-dark", "bg-dark", classes.Navbar]
  const clsOF = [classes.overflow]

  const toggleNav = () => {
    setOpenNav(!openNav)
  }

  const mediaQueryLists = {}
  let closeNavbar = false
  const queries = {
    md: '(max-width: 768px)'
  }

  if (window && window.matchMedia) {
    mediaQueryLists.md = window.matchMedia(queries.md)
    closeNavbar = mediaQueryLists.md.matches
  }

  if (closeNavbar) {

    if (openNav) {
      cls.push(classes.open)
      clsOF.push(classes.show)
    }

    return (
      <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <div className="navbar-brand">
            Книжный шкаф
          </div>

          <button
            className="navbar-toggler ml-md-auto"
            type="button"
            onClick={toggleNav}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
        <div className={cls.join(' ')}>
          <div className="navbar-brand p-4">
            Книжный шкаф
          </div>
          <ul className="navbar-nav pb-4">
            <li className="nav-item">
              <NavLink to="/" exact className="nav-link pl-4">Весь список</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/create" className="nav-link pl-4">Добавить книгу</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/books" className="nav-link pl-4">Управление</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/places" className="nav-link pl-4">Полки</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/auth" className="nav-link pl-4">Выйти</NavLink>
            </li>
          </ul>
        </div>
        <div
          className={clsOF.join(' ')}
          onClick={toggleNav}
        ></div>
      </div>
    )
  } else {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="navbar-brand">
          Книжный шкаф
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/" exact className="nav-link">Весь список</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/create" className="nav-link">Добавить книгу</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/books" className="nav-link">Управление</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/places" className="nav-link">Полки</NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-md-auto">
          <li>
            <NavLink to="/auth" className="nav-link">
              <IconSignOut />
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}