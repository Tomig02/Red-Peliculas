import React, {useState} from "react";
import {TextField, InputAdornment} from "@material-ui/core";
import {Search} from "@material-ui/icons"


function SearchField(props){
    // states for search bar
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let searchWait = null;

    const handleChange = (event) => {
        setSearchText(event.target.value)
        clearTimeout(searchWait);
    }

    //search movie name to IMDb API after 5 seconds of no typing
    React.useEffect(() => {    

        searchWait = setTimeout( async () => {
            const myHeaders = new Headers;
            myHeaders.append('Content-Type', 'application/json');

            const requestOptions = {
                method: 'GET',
                headers: myHeaders
            };              //https://server-social.herokuapp.com
            
            const url = "https://api.themoviedb.org/3/search/multi?api_key=1a7fc1f0540376ccf1ee3ff625d6363e&query=" + searchText
            try{
                const request = await fetch(url , requestOptions);
                if(!request.ok) throw new Error("failed fetch");
                const content = await request.json();
                console.log(content);
                props.sendData(content.results);
            }
            catch(err){
                console.log(err.message);
            }
            finally{
                setIsLoading(false);
            }
        }, 2000);
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