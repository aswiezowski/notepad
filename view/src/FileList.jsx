import React, { Component } from 'react';
import axios from 'axios';

class FileList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: []
        };
        this.getFilelist();
    }

    getFilelist = () => {
        axios.get('api/files').then((response) => {
            this.setState({ files: response.data });
        }).catch(function (error) {
            console.error(error);
        });
    }

    download = (event, filename) => {
        event.preventDefault();
        axios.get("api/file/" + filename).then((response) => {
            return response;
        })
    }


    render() {
        return (
            <div>
                <h5 className="text-center">
                    Files
                </h5>
                <div className="list-group">
                    {this.state.files.map(element => {
                        return (
                            <a href={"api/file/" + element.name} className="list-group-item list-group-item-action">{element.name} <br />
                                <div className="row">
                                    <div className="col">
                                        <span className="text-muted text-right small mr-1">{element.size}B</span>
                                    </div>
                                    <div className="col text-right">
                                        <span className="text-muted text-right small ml-1">{element.mtime}</span>
                                    </div>
                                </div>

                            </a>
                        )
                    })}
                </div>
            </div>);
    }
}

export default FileList;