import React, {useState} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, Container, Grid, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import * as yup from 'yup';
import {authManager} from '../../utils/AuthManager';
import {Alert} from "@material-ui/lab";

const styles = {
    root: {
        height: "100%"
    }
}
const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .required(),

});
const Login = (props) => {
    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,

        onSubmit: values => {
            authManager.login(values.email, values.password,
                successValue => {
                    setError("")
                    formik.setSubmitting(false)
                    props.history.push("/app")
                },
                error => {
                    setError(error.message)
                    formik.setSubmitting(false)
                });
        },

    });

    return (
        <Container style={styles.root} maxWidth={"md"}>
            <Grid style={styles.root} container={true} justify={"center"} alignItems={"center"}>
                <Card>
                    <CardHeader title={"Login"}/>
                    <CardContent>
                        {Boolean(error) && <Alert severity="error">{error}</Alert>}
                        <TextField onChange={formik.handleChange} onBlur={formik.handleBlur}
                                   error={!!formik.errors.email} helperText={formik.errors.email} name={"email"}
                                   fullWidth={true} margin={"dense"} type={"email"} label={"Email"}
                                   variant={"outlined"}/>
                        <TextField onChange={formik.handleChange} onBlur={formik.handleBlur}
                                   error={!!formik.errors.password} helperText={formik.errors.password}
                                   name={"password"} fullWidth={true} margin={"dense"} type={"password"}
                                   label={"Password"} variant={"outlined"}/>
                    </CardContent>
                    <CardActions>
                        <Grid container={true} direction={"column"}>
                            <Button disabled={formik.isSubmitting} onClick={formik.handleSubmit} color={"primary"}
                                    variant={"contained"} fullWidth={true}>Login</Button>
                            <Button onClick={e => props.history.push("/register")} variant={"text"}>Register</Button>
                        </Grid>

                    </CardActions>
                </Card>
            </Grid>

        </Container>

    )
}

export default Login
