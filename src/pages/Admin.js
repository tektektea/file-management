import React from 'react';
import {Button,Grid, Container} from "@material-ui/core";
import Header from "../components/Header";
import {Route,Switch} from "react-router-dom";
import Dashboard from "./Dashboard";
import Create from "./documents/Create";
import Documents from "./documents/Documents";

export default function Admin() {

    return (
        <Grid container={true} direction={"column"}>
            <Header/>
            <main style={{margin:16}}>
                <Switch>
                    <Route exact={true} path={"/app/documents/create"} component={Create}/>
                    <Route exact={true} path={"/app/documents"} component={Documents}/>
                    <Route exact={true} path={"/app"} component={Dashboard}/>
                </Switch>

            </main>

        </Grid>
    );
}
