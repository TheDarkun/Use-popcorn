import {useEffect, useState} from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
const KEY = "d07beb61"

export default function SelectedMovie({selectedId, onCloseMovie}) {

    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                setIsLoading(true);
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
                        <div className="rating">
                            <StarRating/>
                        </div>
                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>}
        </div>
    )
}