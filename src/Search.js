import {useEffect, useRef} from "react";

export default function Search({query, setQuery}) {
    
    const inputEl = useRef();
    
    useEffect(() => {

        const callback = (e) => {
            if(e.code === "Enter" && document.activeElement !== inputEl.current) {
                setQuery("");
                inputEl.current.focus();
            }
        }
        
        document.addEventListener("keydown", callback)
        
        return () => document.removeEventListener("keydown", callback);
    }, [])
    
    return (
        <input
            autoFocus
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    )
}