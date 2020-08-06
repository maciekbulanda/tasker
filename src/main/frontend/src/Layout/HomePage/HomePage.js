import React, {Fragment} from "react";
import Sidebar from "../Sidebar/Sidebar";
import TaskList from "../../Components/TaskList/TaskList";

const HomePage = () => {
    return (
        <Fragment>
            <Sidebar/>
            <TaskList/>
        </Fragment>

    )
}

export default HomePage;