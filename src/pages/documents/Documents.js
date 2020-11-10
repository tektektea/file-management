import React, {useEffect, useState} from "react";
import {Button, Grid, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import Document from "./Document";
import {documentService} from "../../services/DocumentService";
import {NotifyMessage} from "../../actions/configActions";
import {connect} from "react-redux";


const Documents = ({NotifyMessage}) => {
    const [documents, setDocuments] = useState([]);
    const history = useHistory();

    useEffect(()=>{
        documentService.all()
            .then(snapshot => setDocuments(snapshot.docs.map(item => {
                return {
                    id:item.id,
                    cno:item.data().cno,
                    description:item.data().description
                }
            })))
            .catch(error => NotifyMessage(true, "error", error.message));
    },[]);

    const handleDelete=(id)=>{
        documentService.deleteDoc(id)
            .then(value=>{
                documentService.deleteFile(id)
                    .then(() => console.log("delete file"))
                    .catch(error => console.error("delete file error", error));

                const temp = documents.filter(item => item.id != id);
                setDocuments(temp);
                NotifyMessage(true, "success", "Document deleted successfully")
            })
            .catch(error => NotifyMessage(true, "error", error.message));

    }
    return (
        <Grid container={true} justify={"center"} spacing={8}>
            <Grid item={true} container={true} justify={"space-between"}>
                <Typography variant={"h3"}>Documents</Typography>
                <Button onClick={e => history.push("/app/documents/create")} color={"primary"} variant={"outlined"}>New Document</Button>
            </Grid>
            <Grid item={true} container={true} justify={"center"} spacing={8}>
                {documents.map(doc => <Document onDelete={handleDelete} id={doc.id} description={doc.description} cno={doc.cno}/>)}
            </Grid>

        </Grid>
    );
}
const mapDispatchToProps={
  NotifyMessage
}
export default connect(null,mapDispatchToProps)(Documents);
