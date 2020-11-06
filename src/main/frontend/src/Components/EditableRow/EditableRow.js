import React, {useState} from "react";

const EditableDisplay = (props) => {
    const inputStyle = {
        display : "inline-block",
        borderTop : "none",
        borderLeft : "none",
        borderRight : "none",
        borderBottom : "1px solid gray",
        outline : "none",
        fontSize : "inherit",
        width : "100px",
        padding : "5px"
    }

    const editOn = props.editOn;
    let children = props.children;
    const changeHandler = (e) => {
        props.onChange(e.target.value);
    }
    let comp;
    if (editOn) {
        comp = <input style={inputStyle} onChange={changeHandler} type={"text"} value={children}/>
    } else {
        comp = <div style={inputStyle}>{children}</div>
    }
    return (
        <>
            {comp}
        </>
    )
}

const EditableRow = (props) => {
    let [edit, setEdit] = useState(false);
    let [values, setValues] = useState(props.data);
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
        <div onDoubleClick={dblClickHandler}>
            {values.map((el, index) => (<EditableDisplay editOn={edit}
                                              onChange={(val) => changeHandler(index, val)}>{el}</EditableDisplay>))}
            {edit ? (<button onClick={okHandler}>OK</button>) : null}

        </div>
    )
}

export default EditableRow;