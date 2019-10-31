import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ItemState from './context/item/ItemState';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import './App.css';

function App() {
  return (
    <ItemState>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
          </Switch>
        </div>
      </Router>
    </ItemState>
  );
}

export default App;
