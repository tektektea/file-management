import React, {useEffect,useState} from "react";
import {useParams} from 'react-router-dom';
import {documentService} from "../../services/DocumentService";
import {Button, Grid, Typography} from "@material-ui/core";
import Document from "./Document";
import {NotifyMessage} from "../../actions/configActions";
import {connect} from "react-redux";


const Search=({NotifyMessage})=>{
    const [documents, setDocuments] = useState([]);
    const params = useParams();

    useEffect(()=>{
        let id=params.cno;
         documentService.search(id)
             .then(snapshot => {
                 if (snapshot.exists) {
                     let temp={
                         id:id,
                         cno:snapshot.data.id,
                         description:snapshot.data.description
                     }
                     setDocuments(prevState => [temp,...prevState]);
                 }else {
                     NotifyMessage(true,"info","No result found")
                 }
             })
             .catch(error => NotifyMessage(true, "error", error.message));
    },[])

    const handleDelete=()=>{

    }
    return(
        <Grid container={true} justify={"center"} spacing={8}>
            <Grid item={true} container={true} justify={"space-between"}>
                <Typography variant={"h6"}>Search Result</Typography>
            </Grid>
            <Grid item={true} container={true} justify={"center"} spacing={8}>
                {documents.map(doc => <Document onDelete={handleDelete} id={doc.id} description={doc.description} cno={doc.cno}/>)}
            </Grid>

        </Grid>
    )
}

const mapDispatchToProps={
    NotifyMessage
}

export default connect(null, mapDispatchToProps)(Search);
