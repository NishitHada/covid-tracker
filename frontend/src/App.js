import React, { Component } from 'react'
import Input from './components/Input'
import Dashboard from './components/Dashboard'


// // import Test from './Test'
// import Radio from './Radio'
// import DataReactTable from './DataReactTable'
// import Map from './Map'


export class App extends Component {
 
  render() {
    return (
      // <div>
      //   <h1>hell</h1> 
      //   <Map />
      // </div>

      
      <div>
        <Input />
        <Dashboard />
      </div>
    )
  }
}

export default App
