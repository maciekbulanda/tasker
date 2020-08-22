import React, {useEffect} from "react";

const NewTask = (props) => {
    useEffect(()=> {
        console.log("useEffect");
    })
    return (
        <div>NewTask</div>
    )
}

export default NewTask;