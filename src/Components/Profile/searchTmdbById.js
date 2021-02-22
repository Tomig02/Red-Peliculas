
async function searchTmdbById(id){
    
    const myHeaders = new Headers;
    myHeaders.append('Content-Type', 'application/json');
    const requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    const url = "https://api.themoviedb.org/3/movie/"
        + id
        + "?api_key=1a7fc1f0540376ccf1ee3ff625d6363e"
        + "&include_adult=false";

    // fetch movie data
    try{
        const request = await fetch(url , requestOptions);
        if(!request.ok) throw new Error("failed fetch");
        const content = await request.json();
        return content;
    }
    catch(err){
        console.log(err.message);
    }
}

export default searchTmdbById;