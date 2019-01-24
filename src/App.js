import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Products } from './Products';
import { Table } from './Table';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Products/>
        {/* <Table/> */}
      </div>
    );
  }
}

export default App;
