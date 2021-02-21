import React, {useState} from "react";
import {Grid, Typography, Paper, Avatar, Card, CardMedia, CardActions, CardContent} from "@material-ui/core";

import searchTmdbById from "./searchTmdbById";
import MovieCard from "../Home/Components/MovieCard";

function Profile(props){

    // states for slicing the favorite movies array from min to max
    const [minSaved, setMinSaved] = useState(0);
    const [maxSaved, setMaxSaved] = useState(2);

    // states for slicing the saved movies array from min to max
    const [minFavorite, setMinFavorite] = useState(0);
    const [maxFavorite, setMaxFavorite] = useState(2);

    const searchMovieById = (data, category) => {
        console.log("enter");
        const slicedArray = category? data.slice(minSaved, maxSaved): data.slice(minFavorite, maxFavorite);

        const array = [];
        for(let i = 0; i < slicedArray.length; i++){
            searchTmdbById(slicedArray[i])
                .then(movie => array.push(movie))
        }
       console.log(array)
        array.map((data) => {
            return(
                <Grid item xs={4} key={data.id}>
                    <Card>
                        <CardMedia
                            style={{height:"200px", backgroundColor:"#f5f5f5"}}
                            image={"https://image.tmdb.org/t/p/original" + data.image}
                        />
                        <CardContent>
                            <Typography>{data.title}</Typography>
                        </CardContent>
                        <CardActions>

                        </CardActions>
                    </Card>
                
                    {/* <MovieCard 
                        data={{
                            title: data.title? data.title: data.name,
                            image: data.poster_path? data.poster_path: data.profile_path,
                            description: data.overview,
                            rating: data.vote_average,
                            date: data.release_date? data.release_date: "Not specified",
                            keyCode: Math.random()
                        }}
                    /> */}
                </Grid>
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
                                R
                            </Avatar>
                        </Grid>
                        <Grid item xs={10}container spacing={4}>
                            { /* first row of data*/ }
                            <Grid item container className="center">
                                <Grid item xs={4} >
                                    <Typography>Username: {props.userInfo.username}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>Name: {props.userInfo.name}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>Surname: {props.userInfo.surname}</Typography>
                                </Grid>
                            </Grid>

                            { /* second row of data*/ }
                            <Grid item container>
                                <Grid item xs={4}>
                                    <Typography>Email: {props.userInfo.Email}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>Gender: {props.userInfo.gender}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>Age: {props.userInfo.age}</Typography>
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
                    <Grid container style={{minHeight: "300px"}}>
                        {props.userInfo.favoriteMovies? searchMovieById(props.userInfo.favoriteMovies): null}
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className="fullwidth" style={{padding:"1vw"}}>
                    <h2 className="text">Saved</h2>
                    <hr/>
                    <Grid container style={{minHeight: "400px"}}>
                        {props.userInfo.savedMovies? searchMovieById(props.userInfo.savedMovies): null}
                    </Grid>
                </Paper> 
            </Grid>   
        </Grid>
    );
}

export default Profile;