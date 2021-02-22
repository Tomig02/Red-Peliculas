import React from "react";
import {Grid, Typography, Card, CardMedia, CardActions, CardContent} from "@material-ui/core";

function MovieSimple(props){
    return(
        <Grid item xs={4} >
            <Card key={props.data.id}>
                <CardMedia
                    style={{height:"200px", backgroundColor:"#f5f5f5"}}
                    image={"https://image.tmdb.org/t/p/original" + props.data.image}
                />
                <CardContent>
                    <Typography>{props.data.title}</Typography>
                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        </Grid>
    );
}

export default MovieSimple;