import React, {Fragment} from "react";
import Sidebar from "../Sidebar/Sidebar";
import TaskList from "../../Components/TaskList/TaskList";
import {Link} from "react-router-dom";
import "../../common/styles.css";

const HomePage = (props) => {
    let result;
    if (props.username) {
        result = (
            <Fragment>
                <Sidebar/>
                <TaskList/>
            </Fragment>
        )
    } else {
        result = (
            <span style={{fontSize : "1.5em"}}>Please <Link className={"normal"} to={"/login"}>log in</Link></span>
        )
    }
    return (
        result
    )
}

export default HomePage;