import {useState,useEffect} from "react";
import { fetchMovieById } from "../services/omdb";
import MovieCard from "../components/MovieCard";

function Wishlist({wishlist}){
    const [movies,setMovies] = useState([]);

    useEffect(()=>{
        async function loadWishlist(){
            const data = await Promise.all(
                wishlist.map((id)=>fetchMovieById(id))
            );
            setMovies(data);
        }
        loadWishlist();
    },[wishlist]);

    let content;

    if(wishlist.length===0){
        content=<p className="p-6 text-center text-xl"> Nothing added to Wishlist </p>
    }else{
        content = <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {movies.map((movie)=>(
                <MovieCard key={movie.imdbID} movie={movie} />
            ))}
        </div>

    }

    return(
        <div className="p-6 pt-25">
            <h1 className="text-2xl font-bold mb-6">
                My Wishlist
            </h1>

            {content}
        </div>
    );
}

export default Wishlist;