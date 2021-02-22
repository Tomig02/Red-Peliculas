import React, {useState} from "react";
import {Grid, Button} from "@material-ui/core";
import {Forum, FlashOn, ReportProblem} from "@material-ui/icons";


import TopBar from "./TopBar";
import MovieCard from "./Components/MovieCard";
import SearchTMDb from "./Components/SearchTMDb";
import SideBar from "./SideBar";


function HomePage(props){

    const [movieData, setMovieData] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [search, setSearch] = useState("/trending/all/day");
    const [text, setText] = useState("");

    React.useEffect(() => {
        SearchTMDb(search, text, setMovieData, pageNum);
    },[pageNum, search, text]);

    const useMovieData = () => {
        return movieData.map((data) => {
            return( 
                <Grid item xs={4} key={data.id}>
                    <MovieCard 
                        data={{
                            title: data.title? data.title: data.name,
                            image: data.poster_path? data.poster_path: data.profile_path,
                            description: data.overview,
                            rating: data.vote_average,
                            date: data.release_date? data.release_date: "Not specified",
                            id: data.id,
                        }}
                        function={{
                            userInfo: props.userInfo,
                            setUserInfo: props.setUserInfo
                        }}
                    />
                </Grid>
            );
        })
    }

    const searchByOption = (type, text) => {
        setSearch(type);
        setText(text);
    }

    const handlePage = (event) => {
        const num = parseInt(event.currentTarget.value);
        setPageNum(prevState => (prevState + num));
    }

    return(
        <div>
            <div style={{height:"100px"}}></div>

            <TopBar searchByOption={searchByOption} setIsLoggedIn={props.setIsLoggedIn} />
            <Grid container>
                <SideBar setSearch={setSearch} setText={setText}/>
                <Grid item xs={10} container spacing={2} style={{padding:"1%"}}>
                    {useMovieData()}
                    <Grid style={{height: "100px", justifyContent: "space-around"}} item xs={12} className="center">
                        <Button variant="contained" color="secondary" value={-1} onClick={handlePage} disabled={pageNum === 1}>Prev Page</Button>
                        <Button variant="contained" color="secondary" value={1} onClick={handlePage}>Next Page</Button>
                    </Grid>
                </Grid>
            </Grid>    
        </div>
    );
}

export default HomePage;