import React, { Component } from 'react';
import logo from './logo.svg';
import './App.global.css';
import * as api from './api';

class App extends Component {
  state = {
    isLoading: false,
    airports: null,
    searchParams: null,
    flights: null
  };

  componentDidMount() {
    this.setState({isLoading: true});
    api.readAirportList()
      .then(airports => {
        this.setState({
          airports,
          isLoading: false
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    let airports = null;
    if (this.state.isLoading) {
      airports = <div>Loading...</div>
    }
    if (!this.state.isLoading && !this.state.flights) {
      airports = <div>Search form</div>
    }
    if (!this.state.isLoading && this.state.flights) {
      airports = <div>Flight list</div>
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {airports}
      </div>
    );
  }
}

export default App;
