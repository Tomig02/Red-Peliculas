import React, { useState } from "react";
import {Grid, Paper, Button} from "@material-ui/core"
import {Link, useHistory} from "react-router-dom";

import LandingForm from "./LandingForm";


function Landing(props){

    const history = useHistory();

    // if user accesed to his account recently then login automatically
    React.useEffect(() => {
        
        const userToken = localStorage.getItem("userToken");
        if(userToken){
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    id: userToken
                })
            };
            try{
                fetch("https://server-social.herokuapp.com/login", requestOptions)
                    .then(response => {
                        if(!response.ok) throw new Error("failed fetch");
                        return response.json()
                    })
                    .then(response => props.setUserInfo(response))
                    .then(() => {
                        props.setIsLoggedIn(true);
                        history.push("/");
                    })
            }catch(err){
                alert(err.message);
            }
        }
    },[])

    const handleUser = (fetchData) =>{
        props.setUserInfo(fetchData);
        localStorage.setItem("userToken", fetchData._id)
        props.setIsLoggedIn(true);
    }

    return(
        <div className="background">
            <Grid container>
                <Grid item xs={6} className="center text column">
                    <h1>WorldNow</h1>
                    <h2>Comunicate y comparti con el mundo</h2>
                </Grid>
                <Grid item xs={6} className="center">
                    <Paper className="paper">
                        <Grid container spacing={5} direction="column">
                            <Grid item xs={12}>
                                <h3 className="text">Ingresar:</h3>
                                <LandingForm handleUser={handleUser}/>
                            </Grid>
                            <Grid item xs={12} className="center column">
                                <h3 className="text">Todavia no tenes una cuenta?</h3>
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