import React, { Component } from 'react';
import './App.css';
import Nav from './Nav.js'
import AddText from './AddText.js'
import AddFile from './AddFile.js'
import LastLog from './LastLog.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route } from "react-router-dom";

class App extends Component {
    
  render() {
    return (
      <div className="container">
        <Nav></Nav>
        <Route path='/' component={LastLog} exact></Route>
        <Route path='/add-text' component={AddText}/> 
        <Route path='/add-file' component={AddFile}/> 
      </div>
    );
  }
}

export default App;
