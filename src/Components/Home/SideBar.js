import React from "react";
import {Grid, Button} from "@material-ui/core";
import {Forum, FlashOn, ReportProblem} from "@material-ui/icons";


function SideBar(props){

    const handleClick = (e) => {
        e.preventDefault();
        props.setSearch(e.currentTarget.value);
        props.setText("");
    }

    return(
        <Grid item xs={2} container direction="column">
            <h2 className="text">Search By</h2>
            <hr/>
            <Button value="/trending/all/day" onClick={handleClick}><FlashOn/>Trending</Button>
            <Button value="/movie/top_rated" onClick={handleClick}><Forum/>Top Rated</Button>
            <Button value="/movie/popular" onClick={handleClick}><ReportProblem/>Popular</Button>
            <Button value="/movie/upcoming" onClick={handleClick}><ReportProblem/>Upcoming</Button>
            <Button value="/movie/now_playing" onClick={handleClick}><ReportProblem/>Playing Now</Button>
            <hr/>
            <h2 className="text">Last Favorite</h2>
            <hr/>
        </Grid>
    )
}

export default SideBar;