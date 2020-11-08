import React, {useEffect, useState} from "react";
import EditableRow from "../EditableRow/EditableRow";

const GroupList = (props) => {
    let [groupsWithUsernames, setGroups] = useState([]);

    const idToUser = (group, usersMap) => {
        let users = group.users.map(user => usersMap.get(user));
        let newGroup = {...group};
        newGroup.users = users;
        return newGroup;
    }

    useEffect(() => {
        let usersMap = new Map();
        props.users.forEach(user => usersMap.set(user.id, user.username));
        setGroups(props.groups.map(group => idToUser(group, usersMap)));
        // eslint-disable-next-line
    }, [props.users, props.groups])
    return (
        <>
            {groupsWithUsernames.map(group => <EditableRow key={group.id} data={Object.values(group)}/>)}
        </>
    )
}

export default GroupList;