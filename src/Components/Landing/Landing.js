import React, { useState } from "react";
import {Grid, Paper, Button} from "@material-ui/core"
import {Link} from "react-router-dom";

import LandingForm from "./LandingForm";
import "./LandingStyle.css";


function Landing(props){

    const handleUser = (userData, fetchData) =>{
        if (userData.userName === fetchData.name && userData.password === fetchData.height){
            props.logInUser(fetchData);
        }
        else{
            console.log("no coincide");
        }
    }

    return(
        <div className="background">
            <Grid container>
                <Grid item xs={6} className="center text">
                    <h1>WorldNow</h1>
                    <h2>Comunicate y comparti con el mundo</h2>
                </Grid>
                <Grid item xs={6} className="center">
                    <Paper style={{padding:"30px"}}>
                        <Grid container spacing={5} direction="column">
                            <Grid item xs={12}>
                                <h3 className="text">Ingresar:</h3>
                                <LandingForm handleUser={handleUser}/>
                            </Grid>
                            <Grid item xs={12} className="center">
                                <h3 className="text">Todavia no tenes una cuenta?<br/>Registrate:</h3>
                                <Link className='text-link' to="/register">
                                    <Button variant="contained" color="primary">REGISTRARSE</Button>
                                </Link>
                            </Grid>
                        </Grid> 
                    </Paper>
                </Grid>   
            </Grid>
        </div> 
    );   
}

export default Landing;