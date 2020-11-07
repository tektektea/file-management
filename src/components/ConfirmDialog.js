import React from "react";
import {DialogContent, Dialog, DialogTitle, DialogActions, Button} from "@material-ui/core";

const ConfirmDialog=({title,description,open,onClose,onConfirm})=>{
    return(
        <Dialog fullWidth={true} maxWidth={"sm"} open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{description}</DialogContent>
            <DialogActions>
                <Button onClick={event => onConfirm()} variant={"text"} color={"primary"}>Yes</Button>
                <Button onClick={event => onClose()}>No</Button>
            </DialogActions>
        </Dialog>
    )
}
export default ConfirmDialog;
