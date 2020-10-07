import React, {useEffect, useState} from "react";
import axios from "axios";
import {baseUrl} from "../../common/utils";
import {connect} from "react-redux";

const UserPage = (props) => {
    const connection = axios.create({
        baseURL: baseUrl,
        headers: {
            "Authorization": "Bearer " + props.login.token
        }
    });

    let [groups, setGroups] = useState([]);

    useEffect(() => {
        connection.get("/api/groups").then(resp => setGroups(resp.data));
        // eslint-disable-next-line
    }, []);

    return (
        <div>{groups.map((group, index) => <div key={index}>{group}</div>)}</div>
    );
}

const mapStateToProps = state => {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps)(UserPage);