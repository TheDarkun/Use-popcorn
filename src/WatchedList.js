import Watched from "./Watched";

export default function WatchedList({watched}) {
    return (
        <ul className="list ">
            {watched.map((movie) => <Watched movie={movie} key={movie.imdbID}/>)}
        </ul>
    )
}