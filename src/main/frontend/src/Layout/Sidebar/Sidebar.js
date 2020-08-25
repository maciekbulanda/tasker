import React, {useEffect, useState} from "react";
import classes from "./Sidebar.module.css";
import * as action from "../../Store/actions"
import axios from "axios";
import {connect} from "react-redux";
import {baseUrl} from "../../common/utils.js";
import Tag from "../../Components/Tag/Tag";

const Sidebar = (props) => {
    const connection = axios.create({
        baseURL: baseUrl,
        headers: {
            "Authorization": "Bearer " + props.login.token
        }
    });

    let [tags, setTags] = useState([]);

    useEffect(() => {
        connection.get("/api/tasks/tags").then((res) => {
            setTags(res.data);
        }) // eslint-disable-next-line
    }, [])

    return (
        <div className={classes.sidebar}>{tags.map((val, index) => (<Tag
            key={index}
            active={props.filterState.tags.includes(val)}
            onClick={() => {props.toggleFilter(val)}} index={index}>{val}</Tag>))}</div>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        filterState: state.filter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleFilter: (str) => dispatch(action.toggleFilterTags(str))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);