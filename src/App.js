import React, { Component } from 'react';
import logo from './logo.svg';
import './App.global.css';
import * as api from './api';
import SearchForm from './SearchForm/SearchForm';
import FlightList from './FlightList/FlightList';

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

  handleSubmitSearchForm = (params) => {
    this.setState({isLoading: true});
    api.searchFlights(params)
      .then(flights => {
        console.log(flights);
        this.setState({
          flights,
          isLoading: false,
          searchParams: params
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    let content = null;
    if (this.state.isLoading) {
      content = <div>Loading...</div>
    } else if (!this.state.isLoading && this.state.airports) {
      const searchFormInitialValues = {
        fromSelect: "Loading",
        toSelect: "Loading",
        departureDate: new Date().toISOString().substring(0, 10),
        returnDate: new Date().toISOString().substring(0, 10)
      };
      if (this.state.airports.length > 1) {
        searchFormInitialValues.fromSelect = this.state.airports[0].code;
        searchFormInitialValues.toSelect = this.state.airports[1].code;
      }
      content = <div>
        <SearchForm
          initialValues={searchFormInitialValues}
          airports={this.state.airports}
          handleSubmit={this.handleSubmitSearchForm}
        />
      </div>
    } else if (!this.state.isLoading && this.state.flights) {
      content = <FlightList flights={this.state.flights}/>
    }

    // console.log(this.state.airports);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Flight Search</h1>
        </header>
        {content}
      </div>
    );
  }
}

export default App;
