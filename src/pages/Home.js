import React from 'react'
import { Card } from '../components/Card'
import { Search } from '../components/Search'
import { Filter } from '../components/Filter'
import { Sort } from '../components/Sort'
import belka from '../belka.jpg'


export const Home = () => {

  const books = [
    {
      author: "Пушкин А.С.",
      name: "Дубровский",
      year: "1834",
      place: "шкаф справа полка левая верхняя",
      image: "../belka.jpg"
    },
    {
      author: "Пушкин А.С.",
      name: "Дубровский",
      year: "1834",
      place: "шкаф справа полка левая верхняя",
      image: "../belka.jpg"
    },
    {
      author: "Пушкин А.С.",
      name: "Дубровский",
      year: "1834",
      place: "шкаф справа полка левая верхняя",
      image: "../belka.jpg"
    },
    {
      author: "Пушкин А.С.",
      name: "Дубровский",
      year: "1834",
      place: "шкаф справа полка левая верхняя",
      image: "../belka.jpg"
    },
    {
      author: "Пушкин А.С.",
      name: "Дубровский",
      year: "1834",
      place: "шкаф справа полка левая верхняя",
      image: "../belka.jpg"
    },
    {
      author: "Пушкин А.С.",
      name: "Дубровский",
      year: "1834",
      place: "шкаф справа полка левая верхняя",
      image: "../belka.jpg"
    },
    {
      author: "Пушкин А.С.",
      name: "Дубровский",
      year: "1834",
      place: "шкаф справа полка левая верхняя",
      image: "../belka.jpg"
    },
    {
      author: "Пушкин А.С.",
      name: "Дубровский",
      year: "1834",
      place: "шкаф справа полка левая верхняя",
      image: "../belka.jpg"
    },
    {
      author: "Пушкин А.С.",
      name: "Дубровский",
      year: "1834",
      place: "шкаф справа полка левая верхняя",
      image: "../belka.jpg"
    },
    {
      author: "Пушкин А.С.",
      name: "Дубровский",
      year: "1834",
      place: "шкаф справа полка левая верхняя",
      image: "../belka.jpg"
    }
  ]


  return (
    <div>
      <h1>Все книги здесь</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-6">
          <Search />
        </div>
      </div>
      <div className="row justify-content-center mb-4">
        <div className="col-6">
          <Filter />
        </div>
      </div>
      <div className="row justify-content-center mb-4">
        <div className="col-6">
          <Sort />
        </div>
      </div>
      <div className="row">
        { books.map(book => {
          return (
            <div className="col-sm-4">
              <Card
                name={book.name}
                author={book.author}
                year={book.year}
                place={book.place}
                image={belka}
              />
            </div>
          )
        }) }
      </div>
    </div>
  )
}