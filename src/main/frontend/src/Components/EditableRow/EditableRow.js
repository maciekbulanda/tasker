import React, {useEffect, useState} from "react";
import classes from "./EditableRow.module.css"

const EditableDisplay = (props) => {
    const editOn = props.editOn;
    let children = props.children;
    const changeHandler = (e) => {
        props.onChange(e.target.value);
    }
    let comp;
    if (editOn) {
        comp = <input className={[classes.editabledisplay, props.class].join(" ")} onChange={changeHandler} type={"text"} value={children}/>
    } else {
        comp = <div className={[classes.editabledisplay, props.class].join(" ")}>{children}</div>
    }
    return (
        <>
            {comp}
        </>
    )
}

const EditableRow = (props) => {
    let [edit, setEdit] = useState(false);
    let [values, setValues] = useState([]);

    useEffect(() => {
        setValues(props.data);
    }, [props.data])

    const dblClickHandler = () => {
        setEdit(true);
    }
    const okHandler = () => {
        console.log({name: values[0], group:values[1], c:values[2]});
        setEdit(false);
    }
    const changeHandler = (index, val) => {
        setValues([...values.slice(0, index), val, ...values.slice(index + 1)])
    }

    return (
        <div style={{display: "flex", alignItems:"flex-start"}} onDoubleClick={dblClickHandler}>
            <EditableDisplay class={classes.id} onChange={(val) => changeHandler(0, val)}>{values[0]}</EditableDisplay>
            <EditableDisplay class={classes.name} editOn={edit} onChange={(val) => changeHandler(1, val)}>{values[1]}</EditableDisplay>
            <EditableDisplay class={classes.admins} editOn={edit} onChange={(val) => changeHandler(2, val)}>{values[2]}</EditableDisplay>
            <EditableDisplay class={classes.users} editOn={edit} onChange={(val) => changeHandler(3, val)}>{values[3]}</EditableDisplay>
            {edit ? (<button onClick={okHandler}>OK</button>) : null}
        </div>
    )
}

export default EditableRow;