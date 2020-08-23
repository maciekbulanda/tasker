import React, {useEffect, useState} from "react";
import classes from "./Sidebar.module.css";
import axios from "axios";
import {connect} from "react-redux";
import {baseUrl} from "../../common/utils.js";

const Sidebar = (props) => {
    const connection = axios.create({
        baseURL: baseUrl,
        headers : {
            "Authorization" : "Bearer " + props.login.token
        }
    });

    let [tags, setTags] = useState([]);

    useEffect(() => {
        connection.get("/api/tasks/tags").then((res) => {
            setTags(res.data);
        })
    }, [])



    return (
        <div className={classes.sidebar}>{tags.map((val, index) => (<div key={index}>{val}</div>))}</div>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps)(Sidebar);