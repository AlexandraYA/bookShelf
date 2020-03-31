import React from 'react'


export const ManageBooks = () => {

  const books = [
    {
      id: 1,
      author: "Пушкин А.С.",
      name: "Дубровский"
    },
    {
      id: 2,
      author: "Пушкин А.С.",
      name: "Дубровский"
    },
    {
      id: 3,
      author: "Пушкин А.С.",
      name: "Дубровский"
    },
    {
      id: 4,
      author: "Пушкин А.С.",
      name: "Дубровский"
    },
    {
      id: 5,
      author: "Пушкин А.С.",
      name: "Дубровский"
    },
    {
      id: 6,
      author: "Пушкин А.С.",
      name: "Дубровский"
    },
    {
      id: 7,
      author: "Пушкин А.С.",
      name: "Дубровский"
    },
    {
      id: 8,
      author: "Пушкин А.С.",
      name: "Дубровский"
    },
    {
      id: 9,
      author: "Пушкин А.С.",
      name: "Дубровский"
    },
    {
      id: 10,
      author: "Пушкин А.С.",
      name: "Дубровский"
    }
  ];

  const renderRows = () => {
    return books.map(book => {
      return (
        <tr>
          <th scope="row">{book.id}</th>
          <td>{book.author}</td>
          <td>{book.name}</td>
          <td>
            <button type="button" className="btn btn-success btn-sm">Ред.</button>
          </td>
          <td>
            <button type="button" className="btn btn-danger btn-sm">Удалить</button>
          </td>
        </tr>
      )
    })
  }


  return (
    <div>
      <h1>Управление Библиотекой</h1>
      <div className="row justify-content-center mb-4">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Автор</th>
            <th scope="col">Название</th>
            <th scope="col"> </th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>

          { renderRows() }

        </tbody>
      </table>
      </div>
    </div>
  )
}