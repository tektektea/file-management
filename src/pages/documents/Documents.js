import React from "react";
import {Button, Grid, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import {useHistory} from 'react-router-dom';

const Documents = (props) => {
    const history = useHistory();
    return (
        <Grid container={true} justify={"center"}>
            <Grid item={true} container={true} justify={"space-between"}>
                <Typography variant={"h6"}>Documents</Typography>
                <Button onClick={e=>history.push("/app/documents/create")} color={"primary"} variant={"contained"}>New Document</Button>
            </Grid>
            <Grid>
                <List>
                    <ListItem>
                        <ListItemText primary={"test"}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={"test"}/>
                    </ListItem>
                </List>
            </Grid>

        </Grid>
    )
}
export default Documents;
