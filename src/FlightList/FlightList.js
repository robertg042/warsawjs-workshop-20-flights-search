import React, {Component} from 'react';

import classes from './FlightList.css';

class FlightList extends Component {
  render() {
    const { flights } = this.props;
    return (
      <div className={classes.FlightList}>
        <ul>
          {flights ? flights.map(flight => <li></li>) : null}
        </ul>
      </div>
    );
  }
}

export default FlightList;
