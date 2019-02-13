import React, { Component } from 'react';
import FileList from './FileList.jsx';
import AddFile from './AddFile.js';

class Files extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>
            <AddFile></AddFile>
            <FileList></FileList>
        </div> );
    }
}
 
export default Files;