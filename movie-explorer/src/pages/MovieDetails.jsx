import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieById } from "../services/omdb";
import { FaCheck,FaPlus} from 'react-icons/fa'

function MovieDetails({wishlist,setWishlist}) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const isWishlisted=wishlist.includes(id);

  function toggleWishlist(){
    if(isWishlisted){
        setWishlist(wishlist.filter((val) => val !== id));
    }
    else{
        setWishlist([...wishlist,id]);
    }
    console.log(wishlist);
  }

  useEffect(() => {
    fetchMovieById(id).then(setMovie);
  }, [id]);

  if (!movie) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 pt-25 flex flex-col md:flex-row gap-6">
      <img
        src={movie.Poster}
        className="w-64 rounded"
      />

      <div >
        <h1 className="text-3xl font-bold">{movie.Title}</h1>
        <p className="mt-4">{movie.Plot}</p>
        <p className="mt-2">⭐ IMDb Rating: {movie.imdbRating}</p>
        <p className="mt-1">📅 Year: {movie.Year}</p>
        
        <button onClick={toggleWishlist} className={`mt-6 px-4 py-2 flex items-center gap-2
            border rounded transition mx-auto text-white bg-black hover:scale-110`}>
            {isWishlisted ? <FaCheck size={18}/> : <FaPlus size={18}/>}
            {isWishlisted ? "Added to wishlist" : "Add to wishlist"}
        </button>
      </div>

    </div>
  );
}

export default MovieDetails;
