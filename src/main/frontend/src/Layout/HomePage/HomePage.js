import React, {Fragment} from "react";
import Sidebar from "../Sidebar/Sidebar";
import TaskList from "../../Components/TaskList/TaskList";
import "../../common/styles.css";

const HomePage = () => {
    return (
        <Fragment>
            <Sidebar/>
            <TaskList/>
        </Fragment>
    )
}

export default HomePage;