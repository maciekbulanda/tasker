import React from "react";
import classes from "./Header.module.css"
import {NavLink} from "react-router-dom";

const Header = props => {
    return (
        <div className={classes.header}>
            <ul>
                <li><NavLink to={"/"}>Home</NavLink></li>
                <li><NavLink to={"/login"}>Login</NavLink></li>
            </ul>
        </div>
    )
};

export default Header;