import React, {useState} from "react";
import {Card, CardHeader, CardContent, Grid, CardActions, TextField, Button, Container} from "@material-ui/core";
import {useFormik} from "formik";
import * as yup from 'yup';
import {authManager} from '../../utils/AuthManager';
import {Alert} from "@material-ui/lab";
const styles={
    root:{
        height:"100%"
    }
}
const registrationSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .required(),
    confirm_password: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')

});
const Register =(props)=>{
    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm_password:''
        },
        validationSchema:registrationSchema,

        onSubmit: values => {
            authManager.signup(values.email, values.password,
                successValue=>{
                    setError("")
                    formik.setSubmitting(false)
                    props.history.push("/app")
                },
                error=>{
                    formik.setSubmitting(false)
                    setError(error.message)
                });
        },

    });

    return(
        <Container style={styles.root}  maxWidth={"md"}>
            <Grid style={styles.root} container={true} justify={"center"} alignItems={"center"}>
                <Card>
                    <CardHeader title={"Registration"}/>
                    <CardContent>
                        {Boolean(error)&&<Alert severity="error">{error}</Alert>}
                        <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} error={!!formik.errors.email} helperText={formik.errors.email} name={"email"} fullWidth={true} margin={"dense"} type={"email"} label={"Email"} variant={"outlined"}/>
                        <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} error={!!formik.errors.password} helperText={formik.errors.password} name={"password"} fullWidth={true} margin={"dense"} type={"password"} label={"Password"} variant={"outlined"}/>
                        <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} error={!!formik.errors.confirm_password} helperText={formik.errors.confirm_password} name={"confirm_password"} fullWidth={true} margin={"dense"} type={"password"} label={"Confirm Password"} variant={"outlined"}/>
                    </CardContent>
                    <CardActions>
                        <Grid container={true} direction={"column"}>
                            <Button disabled={formik.isSubmitting} onClick={formik.handleSubmit}  color={"primary"} variant={"contained"} fullWidth={true}>Register</Button>
                            <Button onClick={e=>props.history.push("/")} variant={"text"}>Login</Button>
                        </Grid>

                    </CardActions>
                </Card>
            </Grid>

        </Container>

    )
}

export default Register
