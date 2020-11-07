import React,{useState} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, IconButton} from "@material-ui/core";
import {Delete, Edit,CloudDownload} from "@material-ui/icons";
import ConfirmDialog from "../../components/ConfirmDialog";

const Document = ({id, cno, description,onDelete}) => {
    const [openConfirm, setOpenConfirm] = useState(false);

    const confirmDelete=()=>{
        setOpenConfirm(false);
        onDelete(id)
    }
    return (
        <Card style={{margin:16,minWidth:"220px"}}>
            <CardHeader title={" C NO:"+cno}
                        action={
                            <div>
                                <IconButton color={"default"}>
                                    <Edit/>
                                </IconButton>
                                <IconButton onClick={event => setOpenConfirm(true)} color={"default"}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        }
            />
            <CardContent>
                {description}
            </CardContent>
            <CardActions>
                <Button variant={"contained"} color={"primary"} startIcon={<CloudDownload/>}>Download</Button>
            </CardActions>
            {openConfirm && <ConfirmDialog open={openConfirm} onClose={()=>setOpenConfirm(false)} title={"Delete"} description={"Do you want to delete?"} onConfirm={()=>confirmDelete()}/>}
        </Card>
    )
}

export default Document;
