import React from "react";
import {Grid, Card, CardActions, CardActionArea, Typography, CardContent, CardMedia, Button} from "@material-ui/core";
import {} from "@material-ui/icons"

function MovieCard(props){

    const setDescription = () => {
        if( (!!props.description) && (props.description.length > 200) ){
            return props.description.slice(0,200) + "...";
        }else{
            if(props.description === ""){
                return "There is no description"
            }
        }
        return props.description;
    }

    return(
        <Card key={props.keyCode}style={{width:"100%", height:"500px"}}>
            <CardActionArea>
                <CardMedia
                style={{height:"200px", backgroundColor:"lightgray"}}
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

                <Button size="small" color="primary">Like</Button>

                <Button size="small" color="primary">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default MovieCard;