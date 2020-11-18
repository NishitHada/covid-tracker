import React, { Component } from 'react'
import axios from 'axios'
// import 'bootstrap/dist/css/bootstrap.min.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export class ViewData extends Component {
    state ={
        persons: []
    }

    componentDidMount() {
        axios.get(`${BASE_URL}/all-data`)
          .then(res => {
            console.log(res);
            const persons = res.data;
            this.setState({ persons });
            // FileDownload(res.data, 'res.JSON');
        })
        console.log(this.state.persons);
    }

    render() {
        return (
            <div>
                <h1>Data Table</h1>
                { this.state.persons.map(person => 
                   <li> {person.EmpId} {person.EmpName} </li>)
                }
                <table>
                    <thead>
                        <tr>
                            <th>EmpID</th>
                            <th>EmpName</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.persons.map((data, key) => {
                            return (
                            <tr key={key}>
                                <td>{data.EmpId}</td>
                                <td>{data.EmpName}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ViewData
