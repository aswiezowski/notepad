import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <nav className="nav nav-tabs">
                <NavLink exact to="/" className="nav-link">Last log</NavLink>
                <NavLink to="/add-file" className="nav-link">Add file</NavLink>
                <NavLink to="/add-text" className="nav-link">Add text</NavLink>
            </nav>
         );
    }
}
 
export default Nav;