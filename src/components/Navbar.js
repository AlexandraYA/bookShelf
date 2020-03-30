import React from 'react'
import { NavLink } from 'react-router-dom'


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
    </ul>
  </nav>
)