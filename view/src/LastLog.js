import React, { Component } from 'react';
import axios from 'axios';

class LastLog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "Waiting for server...",
            newLog: ""
        };
        this.lastLogTextArea = React.createRef();
        this.reloadLastLog();
    }

    appendLastLog = (event) => {
        event.preventDefault();
        axios.post('api/lastlog', { date:new Date(), content: this.state.newLog });
        this.reloadLastLog();
        this.setState({ newLog: "" })
    }

    reloadLastLog = () => {
        axios.get('api/lastlog').then((response) => {
            this.setState({ text: response.data.content });
            this.lastLogTextArea.current.scrollTop = this.lastLogTextArea.current.scrollHeight;
        })
            .catch(function (error) {
               console.log(error);
            })
    }

    handleNewLogChange = (event) => {
        this.setState({ newLog: event.target.value });
    }

    render() {
        return (
            <div>
                <div>
                    <textarea value={this.state.text} ref={this.lastLogTextArea} type="textarea" className="form-control" readOnly={true} rows="16"></textarea>
                </div>
                <form>
                    <div className="form-group">
                        <textarea value={this.state.newLog} onChange={this.handleNewLogChange} placeholder="New log" autoFocus={true} type="textarea" className="form-control mt-3" name="code-field" rows="1">
                        </textarea>
                        <button className="btn btn-primary" type="submit" onClick={this.appendLastLog}>Add</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default LastLog;