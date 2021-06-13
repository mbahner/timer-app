import React, { Component } from 'react';
import './Navbar.css';
import { NavLink } from "react-router-dom";

class Navbar extends Component{
    render() {
        return (
            <div id="nav">
                <NavLink to='/timer' className='link' activeClassName='active'>
                    Timer
                </NavLink>

                <NavLink to='/login' className='link' activeClassName='active'>
                    Login
                </NavLink>

                <NavLink to='/signup' className='link' activeClassName='active'>
                    Sign up
                </NavLink>
            </div>
        );
    }
}

export default Navbar;