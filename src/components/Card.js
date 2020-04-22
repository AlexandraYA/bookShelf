import React from 'react'
import { Link } from 'react-router-dom'


export const Card = props => (
  <div className="card mb-3">
    <div className="row no-gutters">
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{props.book.name.rus}</h5>
          <p className="card-text">{props.book.author.rus}</p>
          <p className="card-text"><small className="text-muted">Год издания книги: {props.book.year}</small></p>
          <p className="card-text">Местоположение книги: {props.book.place}</p>
          <Link to={"/books/" + props.book.id} >Подробнее</Link>
        </div>
      </div>
      <div className="col-md-4">
        <img src={props.image} className="card-img" alt="Book" />
      </div>
    </div>
  </div>
)
