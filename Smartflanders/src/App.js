import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from "./containers/header"
import { Homepage } from "./containers/homepage"
import { Aboutpage } from "./containers/aboutpage"
import { BuildingInfoPage } from './containers/buildinginfopage'
import { createStore } from 'redux'
import { ServicePage } from './containers/servicepage'
import { Search } from "./containers/search"
import { Provider } from 'react-redux'
import PropTypes from 'prop-types';
import rootReducer from './reducers'
import './App.css';


class App extends Component {

  render() {
   // const store = createStore(rootReducer);
    return (
      <div>
        <Router>
          <div className="content">
            <Header />
            <Route exact path="/" component={Homepage}/>
            <Route path="/about" component={Aboutpage}/>
            <Route path="/search" component={Search} />
            <Route path="/gebouw" component={BuildingInfoPage} />
            <Route path="/service" component={ServicePage} />
          </div>
        </Router>
      </div>
    );
  }
}
export default App