import React, { Component } from 'react'
import LocationDashboard from './LocationDashboard'
import ViewData from './ViewData'
import Map from './Map'

export class Dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            location_data: 0,
            button_text: 'Location-Data'
        }
    }

    changeView = () => {
        this.setState({   
          location_data: !this.state.location_data,
          button_text: (this.state.location_data ? 'Location-Data' : 'All-Data')
        })
    }
    
    render() {
        return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={this.changeView} align='center'> {this.state.button_text} </button>
            {(() => {
            if(this.state.location_data)
            {
                return(
                <div>
                <Map /> 
                <LocationDashboard />
                </div>
            )}
            else
            {
                return(
                <div>
                <ViewData />
                </div>
            )}
            })()}
        </div>
        )
    }
}

export default Dashboard
