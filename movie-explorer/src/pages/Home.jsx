import { useEffect, useState } from "react";
import { fetchMoviesBySearch } from "../services/omdb";
import MovieCard from "../components/MovieCard";
import { FaSearch } from "react-icons/fa";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("avengers");
  const [input,setInput] = useState("");

  useEffect(() => {
    fetchMoviesBySearch(search).then((data) => {
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    });
  }, [search]);

  function handleSearch(){
    setSearch(input);
  }

  return (
    <div className="p-6 pt-25">
      <div className="flex items-center w-full md:w-1/3 mb-4 mx-auto border rounded overflow-hidden">
        <input
            type="text"
            placeholder="Search movies..."
            className="flex-1 p-2 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e)=>{
                if(e.key=="Enter"){
                    handleSearch();
                }
            }}
        />
        <button onClick={handleSearch} className="px-4 bg-black text-gray-600 hover:text-white transition">
            <FaSearch size={18}/>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
