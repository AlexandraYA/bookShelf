import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Navbar} from './components/Navbar'
import {Home} from './pages/Home'
import CreateBook from './pages/CreateBook'
import {BookDetail} from './pages/BookDetail'

function App() {
  return (
    <BrowserRouter>
      <div className="flex-grow-1 bg-light">
        <Navbar />
        <div className="container-fluid pt-5">
          <Switch>
            <Route path="/create" component={CreateBook} />
            <Route path="/books/:id" component={BookDetail} />
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
