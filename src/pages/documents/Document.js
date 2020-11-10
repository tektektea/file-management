import React,{useState} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, IconButton} from "@material-ui/core";
import {Delete, Edit,CloudDownload} from "@material-ui/icons";
import ConfirmDialog from "../../components/ConfirmDialog";
import {useHistory} from 'react-router-dom';
import {documentService} from "../../services/DocumentService";

const Document = ({id, cno, description,onDelete}) => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const history = useHistory();

    const confirmDelete=()=>{
        setOpenConfirm(false);
        onDelete(id)
    }
    const gotoEdit=(id)=>{
        history.push(`/app/dashboard/document/update/${id}`);
    }
    const handleDownload=id=>{
        documentService.downloadFile(id)
            .then(url => {
                const a=document.createElement("a");
                a.href = url;
                a.target="_"
                a.click()
            })
            .catch(err => console.error(err));
    }
    return (
        <Card style={{margin:16,minWidth:"220px"}}>
            <CardHeader title={" C NO:"+cno}
                        action={
                            <div>
                                <IconButton onClick={event => gotoEdit(id)} color={"default"}>
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
                <Button onClick={event => handleDownload(id)} variant={"contained"} color={"primary"} startIcon={<CloudDownload/>}>Download</Button>
            </CardActions>
            {openConfirm && <ConfirmDialog open={openConfirm} onClose={()=>setOpenConfirm(false)} title={"Delete"} description={"Do you want to delete?"} onConfirm={()=>confirmDelete()}/>}
        </Card>
    )
}

export default Document;
