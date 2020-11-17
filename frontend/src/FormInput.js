import React, { Component } from 'react'
import axios from 'axios'
var querystring = require('querystring');

const BASE_URL = process.env.REACT_APP_BASE_URL;

export class FormInput extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            EmpId: '',
            EmpName:'',
            Location: '',
            StartDate: '',
            EndDate: ''
        }
    }

    handleId = (event) => {
        this.setState({
            EmpId : event.target.value
        })
    }

    handleEmpName = (event) => {
        this.setState({
            EmpName: event.target.value
        })
    }

    handleLocation = (event) => {
        this.setState({
            Location: event.target.value
        })

    }

    handleStartDate = (event) => {
        this.setState({
            StartDate: event.target.value
        })
    }

    handleEndDate = (event) => {
        this.setState({
            EndDate: event.target.value
        })
    }

    handleSubmit = (event) => {
        // event.preventDefault();
        console.log(this.state)
        axios.post(`${BASE_URL}/upload-form`, 
        // JSON.stringify(this.state))
        querystring.stringify(this.state))
        .then(response => {
            console.log(response)
            
        })
        .catch(error => {
            console.log(error)  
        })
    }

    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <div className="EmpId">
                    <label>EmpId:</label>
                    <input type='text' 
                    value={this.state.EmpId} 
                    onChange={this.handleId}/>
                </div>

                <div className="EmpName">
                    <label>EmpName:</label>
                    <input type='text' 
                    value={this.state.EmpName} 
                    onChange={this.handleEmpName}/>
                </div>

                <div className="Location">
                    <label>Location:</label>
                    <input type='text' 
                    value={this.state.Location} 
                    onChange={this.handleLocation}/>
                </div>

                <div className="StartDate">
                    <label>StartDate:</label>
                    <input type='text' 
                    value={this.state.StartDate} 
                    onChange={this.handleStartDate}/>
                </div>

                <div className="EndDate">
                    <label>EndDate:</label>
                    <input type='text' 
                    value={this.state.EndDate} 
                    onChange={this.handleEndDate}/>
                </div>
                <button type='submit' className='submit-btn'>Submit</button>
                </form>  
            </div>
        )
    }
}

export default FormInput
