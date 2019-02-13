import React, { Component } from 'react';

class AddText extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <form >
                <div className="form-group">
                    <label htmlFor="code-filed">Code:</label>
                    <textarea type="textarea" className="form-control" name="code-field" rows="24">
                    </textarea>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Send</button>
                </div>
            </form>
         );
    }
}
 
export default AddText;