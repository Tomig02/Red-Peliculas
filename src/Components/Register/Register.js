import React from "react";
import {Grid, Paper} from "@material-ui/core"

import RegisterForm from "./RegisterForm";

function Register(){
    return(
        <div className="background center">
            <Paper className="paper center">
                <Grid container spacing={3} direction="column" className="center">
                    <Grid item xs={12} className="text">
                        <h2 style={{color: '#FF6565'}}>Register</h2>
                        <h3>start sharing now</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <RegisterForm/>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default Register;