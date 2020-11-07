import React from "react";
import PaperDropzone from "../../components/PaperDropzone";
import {Card,Grid,CardHeader,TextField,CardContent,CardActions,Button} from "@material-ui/core";
import {useFormik} from "formik";
import * as yup from "yup";
import {documentService} from "../../services/DocumentService";
import {NotifyMessage} from "../../actions/configActions";
import {useHistory} from 'react-router-dom';
import {connect} from "react-redux";

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = [
    "application/pdf",
];
const validationSchema = yup.object().shape({
    cno: yup
        .string()
        .required(),
    file: yup
        .mixed()
        .required("A file is required")
        .test(
            "fileSize",
            "File too large",
            value => value && value.size <= FILE_SIZE
        )
        .test(
            "fileFormat",
            "Unsupported Format",
            value => value && SUPPORTED_FORMATS.includes(value.type)
        )

});
const Create=({NotifyMessage})=>{
    const history = useHistory();
    const formik=useFormik({
        initialValues:{
            cno: "",
            description: "",
            file:null
        },
        validationSchema,
        onSubmit:values => {
            documentService.addDoc(values.cno,values.description,values.file,(data)=>{
                NotifyMessage(true, "success", "Document uploaded successfully");
                history.goBack();
            },error=>{
                NotifyMessage(true, "error", error);
            })
        }
    });

    return(
        <Grid container={true} justify={"center"}>
            <Card>
                <CardHeader title={"New Document"}/>
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
                               <TextField onChange={event => formik.setFieldValue('file',event.target.files[0])}
                                          name={"file"}
                                          type={"file"}
                                          error={!!formik.values.file && formik.touched}
                                          helperText={formik.errors.file}
                                          label={"File"}
                                          variant={"outlined"}
                                          fullWidth={true} InputLabelProps={{shrink:true}}
                                          margin={"normal"}/>
                </CardContent>
                <CardActions>
                    <Button color={"primary"}
                            variant={"contained"}
                            onClick={formik.handleSubmit}>Upload</Button>
                </CardActions>
                {/*<PaperDropzone/>*/}
            </Card>
        </Grid>

    )
}
const mapDispatchToProps={
    NotifyMessage
}
export default connect(null,mapDispatchToProps)(Create);
