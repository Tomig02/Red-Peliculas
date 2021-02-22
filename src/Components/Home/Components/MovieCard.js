import React, {useState} from "react";
import {Card, CardActions, Typography, CardContent, CardMedia, IconButton} from "@material-ui/core";
import {Favorite, FavoriteBorder, BookmarkBorder, Bookmark} from "@material-ui/icons"

function MovieCard(props){

    const [fav, setFav] = React.useState(false)
    const [sav, setSav] = React.useState(false);

    const setDescription = () => {
        const desc = props.data.description;

        if( (!!desc) && (desc.length > 200) ){
            return desc.slice(0,150) + "...";
        }else{
            if( (!desc) || (desc === "") ){
                return "There is no description"
            }
        }
        return desc;
    }

    const setFavorite = () => {
        setFav(true);
        const newInfo = props.function.userInfo;
        newInfo.favoriteMovies.push(props.data.id);
        props.function.setUserInfo(newInfo);
    }
    const setSaved = () => {
        setSav(true);
        const newInfo = props.function.userInfo;
        newInfo.savedMovies.push(props.data.id);
        props.function.setUserInfo(newInfo);
        console.log(props.function.userInfo);
    }

    return(
        <Card key={props.data.id} className="movieCard">
            <CardMedia
            style={{height:"200px", backgroundColor:"#f5f5f5"}}
            image={"https://image.tmdb.org/t/p/original" + props.data.image}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.data.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {setDescription()}
                </Typography>
                <hr/>
                <Typography>Rating: {props.data.rating}</Typography>
                <Typography>Release: {props.data.date}</Typography>
            </CardContent>

            <CardActions>
                <IconButton size="small" color="secondary" onClick={setFavorite}>
                    {fav? <Favorite />: <FavoriteBorder/>}
                </IconButton>
                <IconButton size="small" color="primary" onClick={setSaved}>
                    {sav? <Bookmark/>: <BookmarkBorder/>} 
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default MovieCard;