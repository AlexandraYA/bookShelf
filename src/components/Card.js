import React from 'react'


export const Card = props => (
  <div className="card mb-3">
    <div className="row no-gutters">
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.author}</p>
          <p className="card-text"><small className="text-muted">Год издания книги: {props.year}</small></p>
          <p className="card-text">Местоположение книги: {props.place}</p>
        </div>
      </div>
      <div className="col-md-4">
        <img src={props.image} className="card-img" alt="Book" />
      </div>
    </div>
  </div>
)
