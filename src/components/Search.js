import React from 'react'


export const Search = props => (
    <from>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <select className="custom-select">
            <option value="1" selected>по автору</option>
            <option value="2">по названию книги</option>
          </select>
        </div>
        <input type="text" className="form-control" placeholder="Введите слово..." />
        <div className="input-group-append">
          <button type="submit" className="btn btn-outline-info">Найти</button>
        </div>
      </div>
    </from>
)
