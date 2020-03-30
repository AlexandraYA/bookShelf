import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Navbar} from './components/Navbar'
import {Home} from './pages/Home'
import {CreateBook} from './pages/CreateBook'
import {BookDetail} from './pages/BookDetail'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container-fluid pt-4">
        <Switch>
          <Route path="/create" component={CreateBook} />
          <Route path="/books/:id" component={BookDetail} />
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
