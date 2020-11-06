import React from "react";
import PaperDropzone from "../../components/PaperDropzone";
import {Card,Grid,CardHeader,TextField,CardContent,CardActions,Button} from "@material-ui/core";
import {useFormik} from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    cno: yup
        .string()
        .required(),
    file: yup
        .string()
        .required(),

});
const Create=(props)=>{
    const formik=useFormik({
        initialValues:{
            cno: "",
            description: "",

        },
        validationSchema,
        onSubmit:values => {
            console.log(values)
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
                               error={!!formik.errors.cno}
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
                               <TextField type={"file"} label={"File"} variant={"outlined"} fullWidth={true} InputLabelProps={{shrink:true}} margin={"normal"}/>
                </CardContent>
                <CardActions>
                    <Button color={"primary"}
                            variant={"contained"}
                            onClick={formik.handleSubmit}>Submit</Button>
                </CardActions>
                {/*<PaperDropzone/>*/}
            </Card>
        </Grid>

    )
}
export default Create;
