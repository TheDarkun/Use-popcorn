import Watched from "./Watched";

export default function WatchedList({watched, onRemoveMovie}) {
    return (
        <ul className="list ">
            {watched.map((movie) => <Watched movie={movie} key={movie.imdbID} onRemoveMovie={onRemoveMovie}/>)}
        </ul>
    )
}