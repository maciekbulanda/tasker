import React, {useEffect, useState} from "react";
import Group from "../Group/Group"

const GroupList = (props) => {
    let [groupsWithUsernames, setGroups] = useState([]);

    useEffect(() => {
        let usersMap = new Map();
        props.users.map(user => usersMap.set(user.id, user.username));
        setGroups(props.groups.map(group => {
            let users = group.users.map(user => usersMap.get(user));
            let newGroup = {...group};
            newGroup.users = users;
            return newGroup;
        }));
        // eslint-disable-next-line
    }, [props.users, props.groups])

    return (
        <>
            {console.log(groupsWithUsernames)}
            {groupsWithUsernames.map(group => <Group key={group.id}>{group}</Group>)}
        </>
    )
}

export default GroupList;