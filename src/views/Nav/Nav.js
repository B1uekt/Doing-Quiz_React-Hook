import React from "react";
import './Nav.scss'
import {
    Link, NavLink
} from "react-router-dom";
const Nav = () => {
    return (
        <div className="topnav">
            <NavLink to="/" activeClassName="active" exact={true}>
                Home
            </NavLink>
            <NavLink to="/todo" activeClassName="active">
                Todos
            </NavLink>
            <NavLink to="/about" activeClassName="active">
                About
            </NavLink>

        </div>
    )
}
export default Nav;