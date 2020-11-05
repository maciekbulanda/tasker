import React, {useEffect, useState} from "react";
import axios from "axios";
import {baseUrl} from "../../common/utils";
import {connect} from "react-redux";
import GroupList from "../../Components/GroupList/GroupList";

const UserPage = (props) => {
    const connection = axios.create({
        baseURL: baseUrl,
        headers: {
            "Authorization": "Bearer " + props.login.token
        }
    });

    let [groups, setGroups] = useState([]);
    let [users, setUsers] = useState([]);

    useEffect(() => {
        connection.get("/api/groups").then(resp => setGroups(resp.data));
        connection.get("/api/users").then(resp => setUsers(resp.data));
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <GroupList groups={groups} users={users}/>
        </div>
                //<div>{groups.map((group, index) => <div key={index}>{group}</div>)}</div>
    );
}

const mapStateToProps = state => {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps)(UserPage);