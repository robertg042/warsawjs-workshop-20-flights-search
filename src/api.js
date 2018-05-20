const readAirportList = () => {
  return window.fetch("https://warsawjs-flights-api.herokuapp.com/airports")
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

const searchFlights = (params) => {
  const {from, to, departureDate, returnDate} = params;
  return window.fetch(`https://warsawjs-flights-api.herokuapp.com/flights/${from}/${to}/${departureDate}/${returnDate}`)
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

window.test = {from: "WAW", to: "ATL", departureDate: "2018-05-20", returnDate: "2018-05-20"};
window.readAirportList = readAirportList;
window.searchFlights = searchFlights;
