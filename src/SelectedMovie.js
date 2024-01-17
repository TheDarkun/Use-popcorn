import {useEffect, useState} from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
const KEY = "d07beb61"

export default function SelectedMovie({selectedId, isAdded, onCloseMovie, onAddToWatched}) {

    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [rating, setRating] = useState(3);
    
    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie;

    function handleAddWatched() {
        const newWatched = {
            imdbID: selectedId,
            title,
            year,
            poster,
            userRating: rating,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0))
        }
        onAddToWatched(newWatched)
        onCloseMovie();
    }
    
    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                setIsLoading(true);
                document.title = "Loading...";
                const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
                const data = await response.json();
                setMovie(data);
            } catch (e) {

            } finally {
                setIsLoading(false);

            }

        }
        getMovieDetails();
        
        
    },  [])

    useEffect(() => {
        if(title) document.title = `Movie: ${title}`;
        return function() {
            document.title = "usePopcorn";
        }
    }, [title])
    
    return (
        <div className="details">
            {isLoading ? <Loader/> :
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
                        <img src={poster} alt={`Poster of ${movie}`}/>
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{released} &bull;</p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐</span>
                                {imdbRating} IMBDb rating
                            </p>
                        </div>
                    </header>
                    <section>
                        {isAdded || (
                            <div className="rating">
                                <StarRating onSetRating={(rating) => setRating(rating)}/>
                                <button onClick={handleAddWatched} className="btn-add">Add to favorites 💚</button>
                            </div>
                        )}
                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>}
        </div>
    )
}