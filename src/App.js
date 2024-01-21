import {useEffect, useState} from "react";
import NavBar from "./NavBar";
import Search from "./Search";
import NumResults from "./NumResults";
import Main from "./Main";
import Box from "./Box";
import Loader from "./Loader";
import MovieList from "./MovieList";
import SelectedMovie from "./SelectedMovie";
import WatchedSummary from "./WatchedSummary";
import WatchedList from "./WatchedList";



const KEY = "d07beb61"

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const aborter = new AbortController();
        setError("");
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: aborter.signal});
                if (!response.ok) throw new Error("Something went wrong with fetching movies")
                const data = await response.json();
                if (data.Response === "False") throw new Error("0 results");
                setMovies(data.Search);
                setIsLoading(false)
            } catch (e) {
                if (e.name !== "AbortError") setError(e.message)
            } finally {
                setIsLoading(false)
            }
        }

        if (query < 3){
            setMovies([]);
            return;
        }

        setSelectedId(null);
        fetchData();

        return () => {
            aborter.abort();
        }
    }, [query])


    function handleIsAdded() {
        const watchedMovie = watched.find(movie => movie.imdbID === selectedId);
        return !!watchedMovie;
    }

    return (
        <>
            <NavBar>
                <Search query={query} setQuery={setQuery}/>
                <NumResults movies={movies}/>
            </NavBar>
            <Main>
                <Box>
                    {isLoading && error === "" && <Loader/>}
                    {error && <p className="error">{error}</p>}
                    {!isLoading && error === "" && <MovieList
                        movies={movies}
                        onSelectedMovie={(id) => setSelectedId(id)}/>}
                </Box>
                <Box>
                    {selectedId ? <SelectedMovie
                            key={selectedId}
                            selectedId={selectedId}
                            isAdded={handleIsAdded()}
                            onCloseMovie={() => setSelectedId(null)}
                            onAddToWatched={(newWatched) => setWatched([...watched, newWatched])}/> :
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedList watched={watched} onRemoveMovie={(removedMovie) => setWatched([...watched].filter(movie => movie !== removedMovie))}/>
                        </>}
                </Box>
            </Main>
        </>
    );
}