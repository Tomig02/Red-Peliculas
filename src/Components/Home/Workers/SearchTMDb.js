
async function SearchTMDb(searchType, searchText, setMovieData, pageNum){

    // create variables for fetch
    const query = searchText? ("&query=" + searchText): "";
    const page = "&page=" + pageNum;

    const myHeaders = new Headers;
    myHeaders.append('Content-Type', 'application/json');
    const requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    const url = "https://api.themoviedb.org/3"
        + searchType
        + "?api_key=1a7fc1f0540376ccf1ee3ff625d6363e"
        + query
        + "&include_adult=false"
        + page;

    // fetch movie data
    try{
        const request = await fetch(url , requestOptions);
        if(!request.ok) throw new Error("failed fetch");
        const content = await request.json();
        setMovieData(content.results);
    }
    catch(err){
        console.log(err.message);
    }
}

export default SearchTMDb;