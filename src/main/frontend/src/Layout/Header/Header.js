import React from "react";
import classes from "./Header.module.css"
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <div className={classes.header}>
            <ul>
                <li><NavLink exact to={"/"} activeClassName={classes.active}>Home</NavLink></li>
                <li><NavLink exact to={"/user"} activeClassName={classes.active}>Konsola</NavLink></li>
                <li><NavLink exact to={"/login"} activeClassName={classes.active}>Login</NavLink></li>
            </ul>
        </div>
    )
};

export default Header;