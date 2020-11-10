import React, {useEffect} from "react";
import PaperDropzone from "../../components/PaperDropzone";
import {Card,Grid,CardHeader,TextField,CardContent,CardActions,Button} from "@material-ui/core";
import {useFormik} from "formik";
import * as yup from "yup";
import {documentService} from "../../services/DocumentService";
import {NotifyMessage} from "../../actions/configActions";
import {useHistory,useParams} from 'react-router-dom';
import {connect} from "react-redux";

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = [
    "application/pdf",
];
const validationSchema = yup.object().shape({
    cno: yup
        .string()
        .required(),
    // file: yup
    //     .mixed()
    //     .required("A file is required")
    //     .test(
    //         "fileSize",
    //         "File too large",
    //         value => value && value.size <= FILE_SIZE
    //     )
    //     .test(
    //         "fileFormat",
    //         "Unsupported Format",
    //         value => value && SUPPORTED_FORMATS.includes(value.type)
    //     )

});


const Edit=({NotifyMessage})=>{
    const history = useHistory();
    const params = useParams();
    const formik=useFormik({
        initialValues:{
            cno: "",
            description: "",
            // file:null
        },
        validationSchema,
        onSubmit:values => {
            const id = params.id;
            documentService.updateDoc(id, values.cno, values.description)
                .then(value => {
                    NotifyMessage(true, "success", "Document updated successfully");
                    setTimeout(() => history.goBack(), 1000);
                })
                .catch(onerror => console.error(onerror));
        }
    });

    useEffect(()=>{
        const id = params.id;
        documentService.getDocument(id)
            .then(doc => {
                if (doc.exists) {
                    formik.setFieldValue("cno", doc.data().cno);
                    formik.setFieldValue("description", doc.data().description);
                }else{
                    NotifyMessage(true, "info", "Document document found");
                    setTimeout(() => history.goBack(), 1000);
                }
            })
            .catch(error=>NotifyMessage(true,"error",error.message))

    },[])
    return(
        <Grid container={true} justify={"center"}>
            <Card>
                <CardHeader title={"Edit Document"}/>
                <CardContent>
                    <TextField name={"cno"}
                               variant={"outlined"}
                               margin={"dense"}
                               fullWidth={true}
                               value={formik.values.cno}
                               error={!!formik.errors.cno && formik.touched}
                               label={"CNO"}
                               helperText={formik.errors.cno}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}/>
                    <TextField name={"description"}
                               variant={"outlined"}
                               margin={"dense"}
                               fullWidth={true}
                               value={formik.values.description}
                               label={"Description"}
                               rows={3}
                               multiline={true}
                               onChange={formik.handleChange} />

                </CardContent>
                <CardActions>
                    <Button color={"primary"}
                            variant={"contained"}
                            onClick={formik.handleSubmit}>Update</Button>
                </CardActions>
                {/*<PaperDropzone/>*/}
            </Card>
        </Grid>

    )
}
const mapDispatchToProps={
    NotifyMessage
}
export default connect(null,mapDispatchToProps)(Edit);
