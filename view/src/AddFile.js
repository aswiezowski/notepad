import React, { Component } from 'react';
import axios from 'axios';
import FileList from './FileList.jsx';

class AddFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFiles: []
        }
    }


    handlesSelectedFile = (event) => {
        this.setState({ selectedFiles: event.target.files });
    }

    handleUpload = (event) => {
        event.preventDefault();
        const data = new FormData()
        for (var i = 0; i < this.state.selectedFiles.length; i++) {
            var file = this.state.selectedFiles[i];
            data.append('file', file, file.name)
        }

        axios.post("api/files", data, {
            onUploadProgress: ProgressEvent => {

            },
        }).then(res => {
        })
    }

    render() {
        return (
            <div>
                
                <h5 className="text-center">Send files</h5>
                <form>
                    <div className="form-group">
                        <input type="file" id="add-file" className="form-control-file" onChange={this.handlesSelectedFile} multiple />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.handleUpload}>Send</button>
                    </div>
                </form>
                <FileList></FileList>
            </div>
        );
    }
}

export default AddFile;