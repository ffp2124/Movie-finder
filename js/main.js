$(document).ready(()=>{
    $('#searchForm').on('submit', (e)=>{
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText){
    document.getElementById("noResult").innerHTML = "";
    //axios.get('http://www.omdbapi.com/?apikey=c6398ee0&s='+searchText)
    axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s='+searchText)
    .then((response) => {
        console.log(response.data.meals);
        //if(response.data.Response !== "False"){ 
        if(response.data.meals !== null){
            console.log(response);
            let movies = response.data.meals;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                    <div class = "col-md-3">
                        <div class = "text-center movieItem"> 
                            <img src="${movie.Poster}">
                            <h5>${movie.Title}</h5>
                            <a onclick = "movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie details</a>
                        </div>
                    </div>
                `;
            });
            $('#movies').html(output);
        }
        else{
            $('#noResult').text("No result, please try again");
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com/?apikey=c6398ee0&i='+movieId)
    .then((response) => {
        console.log(response);
        let movie = response.data;

        let output =`
            <div class ="row">
                <div class = "col-md-4">
                    <img src="${movie.Poster}" class = "thumbnail">
                </div>
                <div class = "col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class = "list-group">
                        <li class = "list-group-item"><strong>Genre : </strong>${movie.Genre}</li>
                        <li class = "list-group-item"><strong>Released : </strong>${movie.Released}</li>
                        <li class = "list-group-item"><strong>Rated : </strong>${movie.Rated}</li>
                        <li class = "list-group-item"><strong>IMDB Rating : </strong>${movie.imdbRating}</li>
                        <li class = "list-group-item"><strong>Director : </strong>${movie.Director}</li>
                        <li class = "list-group-item"><strong>Writer : </strong>${movie.Writer}</li>
                        <li class = "list-group-item"><strong>Actors : </strong>${movie.Actors}</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class = "col-md-12">
                        <h3>Plot</h3>
                        <p>${movie.Plot}</p>
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target ="_blank" class ="btn btn-primary">View IMDB</a>
                        <a href="index.html" class = "btn btn-secondary">Go Back to Search</a>
                </div>  
            </div> 
        `

        $('#movie').html(output);
    })
    .catch((err) => {
        console.log(err);
    })
}