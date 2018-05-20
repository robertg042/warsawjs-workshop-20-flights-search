import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './SearchForm.css';

class SearchForm extends Component {
  state = {
    fromSelect: this.props.initialValues.fromSelect,
    toSelect: this.props.initialValues.toSelect,
    departureDate: this.props.initialValues.departureDate,
    returnDate: this.props.initialValues.returnDate
  };

  handleFromChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleReset = () => {
    console.log("handleReset");
    console.log(`this.state.toSelect: ${this.state.toSelect}`);
    this.setState({...this.props.initialValues})
  };

  render() {
    console.log("render");
    console.log(`this.state.toSelect: ${this.state.toSelect}`);
    return (
      <form
        name="search"
        method="POST"
        onSubmit={this.props.handleSubmit(...this.state)}
        onReset={this.handleReset}
      >
        <div className={classes.SearchForm}>
          <label htmlFor="fromSelect">From:</label>
          <select name="fromSelect"
                  id="fromSelect"
                  value={this.state.fromSelect}
                  onChange={this.handleFromChange}
          >
            {this.props.airports.map(
              ({id, city, code, country}) => {
                return (
                  <option key={id} value={code}>{city}, {country}</option>
                )
              }
            )}
          </select>
          <label htmlFor="toSelect">To:</label>
          <select name="toSelect"
                  id="toSelect"
                  value={this.state.toSelect}
                  onChange={this.handleFromChange}
          >
            {this.props.airports.map(
              ({id, city, code, country}) => {
                return (
                  <option key={id} value={code}>{city}, {country}</option>
                )
              }
            )}
          </select>
          <label htmlFor="departureDate">Departure Date:</label>
          <input type="date"
                 name="departureDate"
                 id="departureDate"
                 value={this.state.departureDate}
                 onChange={this.handleFromChange}/>
          <label htmlFor="returnDate">Return Date:</label>
          <input type="date"
                 name="returnDate"
                 id="returnDate"
                 value={this.state.returnDate}
                 onChange={this.handleFromChange}/>
          <button type={"submit"}>Search</button>
          <button type={"reset"}>Reset</button>
        </div>
      </form>
    );
  };
}

SearchForm.propTypes = {
  airports: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  })),
  initialValues: PropTypes.shape({
    fromSelect: PropTypes.string,
    toSelect: PropTypes.string,
    departureDate: PropTypes.string,
    returnDate: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  // handleReset: PropTypes.func.isRequired,
};

export default SearchForm;
