import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Homepage } from "./containers/homepage";
import { Aboutpage } from "./containers/aboutpage";
import { Header } from "./containers/header"
import { createStore } from 'redux'
import { Search } from "./containers/search"
import { Provider } from 'react-redux'
import PropTypes from 'prop-types';
import rootReducer from './reducers'
import './App.css';


class App extends Component {

  render(){
   // const store = createStore(rootReducer);
    return (
      <div>
      <Router>
        <div>
      <Header />
        <Route exact path="/" component={Homepage}/>
        <Route path="/about" component={Aboutpage}/>
        <Route path="/search-building" component={Search} />
      </div>
      </Router>

      </div>
    );
  }
}
export default App