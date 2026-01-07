import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="hover:scale-105 transition">
        <img src={movie.Poster} alt="No Image Found" className="rounded" />
        <h3 className="text-sm mt-2 text-center">
          {movie.Title}
        </h3>
      </div>
    </Link>
  );
}

export default MovieCard;


