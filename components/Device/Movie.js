import PropTypes from "prop-types";

function Movie({ type, id, coverImage, title, summary, genres }) {
  if (type === "movie")
    return (
      <div>
        <img src={coverImage} alt={title}></img>
        <h2>
          {/* <Link to={`/movie/${id}`}>{title}</Link> */}
        </h2>
        <p>{summary.length > 235 ? `${summary.slice(0,233)}...`:summary}</p>
        <ul>
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    );
  else if (type == "detail")
    return (
      <div>
        <img src={coverImage} alt={title}></img>
        <h2>
          {/* <Link to={'/'}>Go Back Movie List? Click here{title}</Link> */}
        </h2>
      </div>
      
    );
  else return <h1>somethings wrong!</h1>;
}

Movie.prototype = {
  type: PropTypes.string,
  id: PropTypes.number.isRequired,
  coverImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
