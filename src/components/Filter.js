import React from 'react'


export const Filter = props => (
  <form>
    <div className="input-group mb-3">
      <select className="custom-select" defaultValue="1">
        <option value="1">полка 1 справа</option>
        <option value="2">полка 2 справа</option>
        <option value="3">полка на в шкафу у окна</option>
        <option value="4">полка внизу справа</option>
      </select>
      <div className="input-group-append">
        <button type="submit" className="btn btn-outline-secondary">Отфильтровать</button>
      </div>
    </div>
  </form>
)
