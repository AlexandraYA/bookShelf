import React from 'react'
import { NavLink } from 'react-router-dom'
import { IconSignOut } from './UI/IconSignOut'


export const Navbar = () => (
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