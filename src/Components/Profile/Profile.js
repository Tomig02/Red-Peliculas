import React, {Suspense, useState} from "react";
import {Grid, Typography, Paper, Avatar} from "@material-ui/core";

import searchTmdbById from "./searchTmdbById";
import MovieSimple from "./MovieSimple";

function Profile(props){

    // states for slicing the favorite movies array from min to max
    const [minSaved, setMinSaved] = useState(0);
    const [maxSaved, setMaxSaved] = useState(2);

    // states for slicing the saved movies array from min to max
    const [minFavorite, setMinFavorite] = useState(0);
    const [maxFavorite, setMaxFavorite] = useState(2);

    const [saved, setSaved] = useState([]);
    const [favorites, setFavorites] = useState([]);

    React.useEffect( async () => {
        const data = await searchMovieById(props.userInfo.savedMovies, true);
        setSaved(data);
    },[minSaved, maxSaved])
    
    React.useEffect( async () => {
        const data = await searchMovieById(props.userInfo.favoriteMovies, false);
        setFavorites(data);
    },[minFavorite, maxFavorite])
    
    
    const searchMovieById = async (array, category) => {
        const slicedArray = category? array.slice(minSaved, maxSaved): array.slice(minFavorite, maxFavorite);

        const movieArray = [];
        const promise = [];
        slicedArray.forEach(id => {
            promise.push(
                searchTmdbById(id)
                    .then(movie => movieArray.push(movie))
                    .catch(error => console.log(error.message))
            )
        });
        await Promise.all(promise);

        return movieArray.map( data => {
            return(
                <MovieSimple
                    data={{
                        id: data.id,
                        image: data.poster_path,
                        title: data.title
                    }}
                />
            );
        })
    }

    return(
        <Grid container spacing={3} style={{padding:"1vw", background:"#FF6565"}} direction="column">
            <Grid item xs={12}>
                <Paper className="fullwidth" style={{padding:"1vw"}}>
                    <h2 className="text">Profile</h2>
                    <hr/>
                    <Grid container spacing={4} direction="row">
                        <Grid item xs={2} className="center">
                            <Avatar style={{height:"10vw", width:"10vw"}}>
                                User
                            </Avatar>
                        </Grid>
                        <Grid item xs={10}container spacing={4}>
                            { /* first row of data*/ }
                            <Grid item container className="center">
                                <Grid item xs={4} >
                                    <Typography><span className="text">Username: </span>{props.userInfo.username}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography><span className="text">Name: </span> {props.userInfo.name}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography><span className="text">Surname: </span> {props.userInfo.surname}</Typography>
                                </Grid>
                            </Grid>

                            { /* second row of data*/ }
                            <Grid item container>
                                <Grid item xs={4}>
                                    <Typography><span className="text">Email: </span> {props.userInfo.email}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography><span className="text">Gender: </span> {props.userInfo.gender}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography><span className="text">Age: </span> {props.userInfo.age}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>    
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className="fullwidth" style={{padding:"1vw"}}>
                    <h2 className="text">Favorite</h2>
                    <hr/>
                    <Grid container spacing={1} style={{minHeight: "300px"}}>
                        {favorites}
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className="fullwidth" style={{padding:"1vw"}}>
                    <h2 className="text">Saved</h2>
                    <hr/>
                    <Grid container spacing={1} style={{minHeight: "300px"}}>
                            {saved}      
                    </Grid>
                </Paper> 
            </Grid>   
        </Grid>
    );
}

export default Profile;