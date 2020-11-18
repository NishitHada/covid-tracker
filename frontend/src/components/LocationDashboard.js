import React, { Component } from 'react'
import axios from 'axios'
import LocationData from './LocationData'

const BASE_URL = process.env.REACT_APP_BASE_URL;

export class LocationDashboard extends Component {
    state ={
        locations: []
    }

    componentDidMount() {
        axios.get(`${BASE_URL}/emp-count-by-location`)
          .then(res => {
            console.log(res);
            const locations = res.data;
            this.setState({ locations });
          })

        // console.log(this.state.locations);
    }

    render() {
        return (
            <div>
                <h1> DashBoard </h1>
                {/* { this.state.locations.map(location => <li>{location._id} -> {location.myCount}</li>)} */}
                { this.state.locations.map(location => 
                    <LocationData name={location._id} count={location.myCount} /> 
                )}
            </div>
        )
    }
}

export default LocationDashboard
