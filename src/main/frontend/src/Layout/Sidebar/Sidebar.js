import React, {useEffect, useState} from "react";
import classes from "./Sidebar.module.css";
import * as action from "../../Store/actions"
import {connect} from "react-redux";
import Tag from "../../Components/Tag/Tag";

const Sidebar = (props) => {
    let [tags, setTags] = useState([]);

    const sort = (/*Object[]*/tmpTags) => {
        let newTags = tmpTags;
        return newTags;
    }

    useEffect(() => {
        let /*Object[]*/ tmpTags = [];
        for (const task of props.tasks) {
            for (const tag of task.tags) {
                let found = false;
                for (let i=0; i< tmpTags.length; i++) {
                    if (tmpTags[i]._id === tag) {
                        tmpTags[i].count++;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    tmpTags = tmpTags.concat({"_id" : tag, "count" : 1})
                }
            }
        }
        setTags(sort(tmpTags));

    }, [props.tasks])

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