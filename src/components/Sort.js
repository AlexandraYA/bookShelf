import React from 'react'


export const Sort = props => (
  <from>
    <div className="input-group mb-3">
      <select className="custom-select">
        <option value="1" selected>по автору А-Я</option>
        <option value="2">по автору Я-А</option>
        <option value="3">по названию А-Я</option>
        <option value="4">по названию Я-А</option>
        <option value="5">по году издания книги по убыванию</option>
        <option value="6">по году издания книги по возрастанию</option>
      </select>
      <div className="input-group-append">
        <button type="submit" className="btn btn-outline-success">Отсортировать</button>
      </div>
    </div>
  </from>
)
