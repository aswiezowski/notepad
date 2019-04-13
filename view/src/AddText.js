import React, { Component } from 'react';
import axios from 'axios';

class AddText extends Component {
    constructor(props) {
        super(props);
        this.state = { text: "" }
    }

    setText = (event) => {
        this.setState({ text: event.target.value });
    }

    handleUpload = (event) =>{
        event.preventDefault();
        axios.post('api/texts', { text: this.state.text });
        this.setState({text: ""});
    }

    render() { 
        return ( 
            <div aria-live="polite" aria-atomic="true">
                <form >
                    <div className="form-group">
                        <label htmlFor="code-filed">Code:</label>
                        <textarea type="textarea" className="form-control" name="code-field" rows="24" onChange={this.setText} value={this.state.text} >
                        </textarea>
                    </div>
                    <div className="form-group">
                        <button onClick={this.handleUpload} className="btn btn-primary" type="submit">Send</button>
                    </div>
                </form>
            </div>
         );
    }
}
 
export default AddText;