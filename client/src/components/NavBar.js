import React from "react";
import {NavLink, useHistory} from "react-router-dom";
import {useAuth} from "../hooks/auth.hook";

export const NavBar = () =>{
    const auth = useAuth()
    const history = useHistory();
    const logoutHandler = (e) =>{
        e.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
        <div className="nav-wrapper">
            <a href="/" className="brand-logo">Links shorter</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/create">Create</NavLink></li>
                <li><NavLink to="/links">Your links</NavLink></li>
                <li><a href={'/'} onClick={logoutHandler} >Logout</a></li>
            </ul>
        </div>
    </nav>
    )
}
