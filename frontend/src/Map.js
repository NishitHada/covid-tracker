import React, { Component } from 'react';
import axios from 'axios'
// import * as data from './LatLng.json'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

export class Map extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       selectedCity: '',
       locations: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5002/emp-count-by-location`)
      .then(res => {
        console.log(res);
        const locations = res.data;
        this.setState({ locations });
      })

    // console.log(this.state.locations);
  }
  
  
  render() {
    const data = {
      "Bangalore":[12.971599, 77.594566],
      "Pune": [18.5204, 73.8567],
      "Mysore": [12.2958, 76.6394],
      "Chennai": [13.0827, 80.2707]
    };

    // const cities = ["Bangalore", "Pune", "Mysore"];

    // const [selectedCity, setSelectedCity] = useState(null);
    
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = {{ lat:12.971599, lng:77.594566 }}
        defaultZoom = { 6 }
      >
        {/* { cities.map( city => ( */}
          { this.state.locations.map( city => (
        <Marker key={city._id} position={{ 
          lat: data[city._id][0], 
          lng: data[city._id][1]
        }} 
        onClick={() => {
          // setSelectedCity(city);
          this.setState({
            selectedCity: city
          })
        }}
        />
        ))}
        {this.state.selectedCity && (
          <InfoWindow
          position={{ 
               lat: data[this.state.selectedCity._id][0], 
               lng: data[this.state.selectedCity._id][1]
               }}
          onCloseClick={() => {
                 this.setState({
                   selectedCity:''
                 })
               }}
               >
                 <div>
                   <h2>{this.state.selectedCity._id}</h2>
                   <p>Count: { this.state.selectedCity.myCount }</p>
                 </div>

          </InfoWindow>
        )}
      </GoogleMap>
    ));
    
    return (
      <div>
        <GoogleMapExample
          containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
    )
  }
}

export default Map
