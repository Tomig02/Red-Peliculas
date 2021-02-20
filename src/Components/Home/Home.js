import {Grid} from "@material-ui/core";
import React, {useState} from "react";

import TopBar from "./TopBar";
import MovieCard from "./MovieCard";

function HomePage(){

    const [movieData, setMovieData] = useState([]);

    const setData = (movie) => {
        setMovieData(movie);
    }

    const useMovieData = () => {
        console.log(movieData);
        return movieData.map((data) => {
            return( 
            <Grid item xs={3}>
                <MovieCard 
                    title={data.title? data.title: data.name} 
                    image={data.poster_path? data.poster_path: data.profile_path}
                    description={data.overview}
                    keyCode={data.id}
                />
            </Grid>
            );
        })
    }

    return(
        <div>
            <TopBar sendData={setData} />
            <Grid container spacing={2} style={{padding:"2%"}}>
                {useMovieData()}
            </Grid>
        </div>
    );
}

export default HomePage;