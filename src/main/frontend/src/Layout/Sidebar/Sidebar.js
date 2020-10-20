import React, {useEffect, useState} from "react";
import classes from "./Sidebar.module.css";
import * as action from "../../Store/actions"
import {connect} from "react-redux";
import Tag from "../../Components/Tag/Tag";

const Sidebar = (props) => {
    let [tags, setTags] = useState([]);
    let [groups, setGroups] = useState([]);

    useEffect(() => {
        let /*Object[]*/ tmpTags = [];
        for (const task of props.tasks) {
            for (const tag of task.tags) {
                let found = false;
                for (let i = 0; i < tmpTags.length; i++) {
                    if (tmpTags[i]._id === tag) {
                        tmpTags[i].count++;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    tmpTags = tmpTags.concat({"_id": tag, "count": 1})
                }
            }
        }
        setTags(tmpTags.sort((a, b) => {
            return b.count - a.count;
        }));

        let /*Object[]*/ tmpGroups = [];
        for (const task of props.tasks) {
            if (!tmpGroups.includes(task.group)) {
                tmpGroups.push(task.group)
            }
        }
        setGroups(tmpGroups);
    }, [props.tasks])

    return (
        <div className={classes.sidebar}>
            <div>
                <p>Grupy</p>
                {groups.map((val, index) => (<Tag
                    key={index}
                    active={props.filterState.group === val}>{{_id: val}}</Tag>)
                )}
            </div>
            <div>
                <p>Tagi</p>
                {tags.map((val, index) => (<Tag
                    key={index}
                    active={props.filterState.tags.includes(val)}
                    onClick={() => {
                        props.toggleFilter(val)
                    }} index={index}>{val}</Tag>))}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        tasks: state.tasks,
        filterState: state.filter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleFilter: (str) => dispatch(action.toggleFilterTags(str))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);