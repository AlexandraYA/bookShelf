import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateBook from './pages/CreateBook'
import BookDetail from './pages/BookDetail'
import ManageBooks from './pages/ManageBooks'
import Auth from './pages/Auth'


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/create" component={CreateBook} />
        <Route path="/update" component={CreateBook} />
        <Route path="/books/:id" component={BookDetail} />
        <Route path="/books" exact component={ManageBooks} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
