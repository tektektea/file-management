import React from "react";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {NotifyMessage} from "../actions/configActions";
import {connect} from "react-redux";

const Toast=({notify,type,message,NotifyMessage})=>{
    const handleClose=()=>{
        NotifyMessage(false,null,"")
    }
    if (!notify) {
        return null
    }
    return (
        <Snackbar autoHideDuration={5000}  open={notify} onClose={handleClose}>
            <Alert severity={type} variant={"filled"}> {message}</Alert>
        </Snackbar>
    )
}
const mapStateToProps = state=>({
        notify:state.configData.notify,
        type:state.configData.type,
        message:state.configData.message
})
const mapDispatchToProps={
    NotifyMessage
}
export default connect(mapStateToProps, mapDispatchToProps)(Toast);
