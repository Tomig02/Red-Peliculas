import React, {useState} from "react";
import {Grid, Button} from "@material-ui/core";
import {Forum, FlashOn, ReportProblem} from "@material-ui/icons";
import TopBar from "./TopBar";
import MovieCard from "./MovieCard";
import SearchTMDb from "./Workers/SearchTMDb"

function HomePage(props){

    const [userData, setUserData] = useState(props.userInfo);
    const [movieData, setMovieData] = useState([]);
    const [pageNum, setPageNum] = useState(1);

    React.useEffect(() => {
        SearchTMDb("/trending/all/day", null, setMovieData, 1);
    },[])

    const useMovieData = () => {
        return movieData.map((data) => {
            return( 
            <Grid item xs={4} key={data.id}>
                <MovieCard 
                    title={data.title? data.title: data.name} 
                    image={data.poster_path? data.poster_path: data.profile_path}
                    description={data.overview}
                    keyCode={Math.random()}
                />
            </Grid>
            );
        })
    }

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.currentTarget.value);
        SearchTMDb(e.currentTarget.value, null, setMovieData, pageNum);
    }

    const searchByOption = (type, text) => {
        SearchTMDb(type, text, setMovieData, pageNum);
    }

    const handlePage = (event) => {
        if((pageNum + event.currentTarget.value) > 1){
            setPageNum(prevState => prevState + event.currentTarget.value);
        }
    }
    return(
        <div>
            <div style={{height:"100px"}}></div>
            <TopBar searchByOption={searchByOption} setIsLoggedIn={props.setIsLoggedIn} />
            <Grid container>
                <Grid item xs={2} container direction="column">
                    <h2 className="text">Search By</h2>
                    <hr/>
                        <Button value="/trending/all/day" onClick={handleClick}><FlashOn/>Trending Today</Button>
                        <Button value="/movie/top_rated" onClick={handleClick}><Forum/>Top Rated</Button>
                        <Button value="/movie/popular" onClick={handleClick}><ReportProblem/>Popular</Button>
                        <Button value="/movie/upcoming" onClick={handleClick}><ReportProblem/>Upcoming</Button>
                        <Button value="/movie/now_playing" onClick={handleClick}><ReportProblem/>Playing Now</Button>
                    <hr/>
                    <h2 className="text">Last Favorite</h2>
                    <hr/>
                </Grid>
                <Grid item xs={10} container spacing={2} style={{padding:"1%"}}>
                    {useMovieData()}
                    
                    <Grid style={{height: "100px", justifyContent: "space-around"}} item xs={12} className="center">
                        <Button variant="contained" color="secondary" value={1} onClick={handlePage}>Prev Page</Button>
                        <Button variant="contained" color="secondary" value={-1} onClick={handlePage}>Next Page</Button>
                    </Grid>
                </Grid>
            </Grid>    
        </div>
    );
}

export default HomePage;