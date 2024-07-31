const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');




 
const getMovieInfo = async (movie) => {
    try {
    
    const myAPIkey = "b7547717";
    const url = `https://www.omdbapi.com/?apikey=${myAPIkey}&t=${movie}`;

    
        const response = await fetch(url);

        if (!response.ok) {
            throw new error("unable to fetch movie data.")
        }

        const data = await response.json();
        

        if (data.Response === "True") {
            // display or update movie container with data
            showMovieData(data);
        } else {
            // display or update movie container with error message
            console.log(data.Error);
        }
    } 
    catch (error) {
        // display or update movie container with error message
        showErrorMessage("no movie found!");
        // console.log(error);
    }
}
// function to show movie data on screen
const showMovieData = (data) =>{
    movieContainer.innerHTML = "";
    movieContainer.classList.remove('noBackground');
    // using destructing assignment to extracting properties from data object
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;
    
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
    <p><strong>Rating: ⭐</strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });

    movieContainer.appendChild(movieGenreElement);
    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                              <p><strong>Duration: </strong>${Runtime}</p>
                              <p><strong>Cast: </strong>${Actors}</p>
                              <p><strong>Plot: </strong>${Plot}</p>`;


    
    // creating a div for movie poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = ` <img src="${Poster}/">`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);

}


//  funtion to show error message
const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2> Enter movie name to get information.</h2>`;
    movieContainer.classList.add('noBackground');
}
// adding event lister to search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(inputBox.value);
    const movieName = inputBox.value.trim();
    if (movieName !== '') {
        getMovieInfo(movieName);
    }
    else {
        movieContainer.innerHTML = `<h2> Enter movie name to get information.</h2>`;
        movieContainer.classList.add('noBackground');
    }
});
