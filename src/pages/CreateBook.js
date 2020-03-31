import React, { Component } from 'react'
import { createControl } from '../form/formFramework'


function createOptionControl(number) {
  return createControl({
    label: `Вариант ${number}`,
    id: number,
    errorMessage: 'Значение не может быть пустым'
  }, {required: true});
};

function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  };
};

class CreateBook extends Component {

  state = {

  }

  render() {
    return (
      <div>
        <div className="mb-5">
          <h1 className="text-center">Добавить книгу</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-10 col-lg-5">
            <div className="shadow-sm bg-white rounded p-5">
              <form>
                <div className="form-group mb-4">
                  <label htmlFor="bookAuthor" class="sr-only">Автор книги</label>
                  <input type="text" className="form-control form-control-lg" id="bookAuthor" placeholder="Автор книги" />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="bookName" class="sr-only">Название</label>
                  <input type="text" className="form-control form-control-lg" id="bookName" placeholder="Название" />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="bookYear" class="sr-only">Год выпуска книги</label>
                  <input type="text" className="form-control form-control-lg" id="bookYear" placeholder="Год выпуска книги" />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="author" class="sr-only">Местоположение</label>
                  <input type="text" className="form-control form-control-lg" id="author" placeholder="Местоположение" />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="bookFace" class="">Фотография обложки</label>
                  <input type="file" className="form-control-file" id="bookFace" />
                </div>
                <button type="submit" class="btn btn-primary">Сохранить</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default CreateBook