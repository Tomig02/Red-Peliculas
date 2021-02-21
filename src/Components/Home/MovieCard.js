import React from "react";
import {Card, CardActions, CardActionArea, Typography, CardContent, CardMedia, IconButton} from "@material-ui/core";
import {Favorite, AddCircle} from "@material-ui/icons"

function MovieCard(props){

    const setDescription = () => {
        if( (!!props.description) && (props.description.length > 200) ){
            return props.description.slice(0,150) + "...";
        }else{
            if( (!props.description) || (props.description === "") ){
                return "There is no description"
            }
        }
        return props.description;
    }

    return(
        <Card key={props.keyCode} className="movieCard">
            <CardActionArea>
                <CardMedia
                style={{height:"200px", backgroundColor:"#f5f5f5"}}
                image={"https://image.tmdb.org/t/p/original" + props.image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {setDescription()}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <IconButton size="small" color="secondary"> <Favorite /> </IconButton>
                <IconButton size="small" color="primary"> <AddCircle/> </IconButton>
                <div>Likes:</div>
            </CardActions>
        </Card>
    );
}

export default MovieCard;