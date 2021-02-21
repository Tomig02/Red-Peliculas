import React, {useState} from "react";
import {TextField, InputAdornment} from "@material-ui/core";
import {Search} from "@material-ui/icons"


function SearchField(props){
    // states for search bar
    const [searchText, setSearchText] = useState("");
    let searchWait = null;

    const handleChange = (event) => {
        setSearchText(event.target.value)
        clearTimeout(searchWait);
    }
    // /search/multi
    //search movie name to IMDb API after 1 second of no typing
    React.useEffect(() => {    

        searchWait = setTimeout( async () => {
            props.searchByOption("/search/multi", searchText);

            // const myHeaders = new Headers;
            // myHeaders.append('Content-Type', 'application/json');

            // const requestOptions = {
            //     method: 'GET',
            //     headers: myHeaders
            // };              
            
            // const url = "https://api.themoviedb.org/3/search/multi?api_key=1a7fc1f0540376ccf1ee3ff625d6363e" 
            //             + "&include_adult=false"
            //             + "&query=" + searchText
            // try{
            //     const request = await fetch(url , requestOptions);
            //     if(!request.ok) throw new Error("failed fetch");
            //     const content = await request.json();
            //     props.sendData(content.results);
            // }
            // catch(err){
            //     console.log(err.message);
            // }
        }, 1000);
    },[searchText])

    return(
        <TextField 
            label="Search"
            variant = "outlined"
            style={{width:"80%"}}
            size = "small"
            onChange={handleChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start" color="secondary">
                    <Search/>
                    </InputAdornment>
                )}}
        />
    )
}

export default SearchField;