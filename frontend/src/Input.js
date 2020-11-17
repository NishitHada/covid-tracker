import React, { Component } from 'react'
import FormInput from './FormInput'
import FileInput from './FileInput'

const BASE_URL = process.env.REACT_APP_BASE_URL;

export class Input extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             upload_type: 'Form'
        }
    }

    changeUpload = (event) => {
        this.setState({
          upload_type: event.target.value
        })
    }
    
    render() {
        return (
        <div>
            <div className="radio" >
                <input type="radio" 
                    value="Form" 
                    name="Upload-Type" 
                    checked={this.state.upload_type === 'Form'}
                    onChange={this.changeUpload} /> Form
                <input type="radio" 
                    value="File" 
                    name="Upload-Type"
                    checked={this.state.upload_type === 'File'}
                onChange={this.changeUpload} /> File
            </div>
            {( () => {
            if(this.state.upload_type === 'File')
            {
                return(
                <div>
                    <FileInput />
                </div>
                )
            }
            else if(this.state.upload_type === 'Form')
            {
                return(
                <div>
                    <FormInput />
                </div>
                )
            }
            }) () }

        </div>
        )
    }
}

export default Input
