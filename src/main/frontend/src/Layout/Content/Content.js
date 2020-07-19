import React, {Fragment} from "react";
import Sidebar from "../Sidebar/Sidebar";
import LoginForm from "../../Components/LoginForm/LoginForm";

const Content = () => {
    return (
        <Fragment>
            <Sidebar/>
            <LoginForm/>
        </Fragment>
    );
}

export default Content;