const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movies.service");

// Get all movies
async function list(req, res) {
  // Optional query parameter to only get movies where is_showing == true
  const isShowing = req.query.is_showing;
  const moviesList =
    isShowing != null ? await service.listAllShowing() : await service.list();

  res.status(200).json({ data: moviesList });
}

// Read specific movie by movie ID
async function read(req, res) {
  const { movie } = res.locals;

  res.status(200).json({ data: movie });
}

// Validation methods ---------------------------------------------------------
// Verify movie ID from route parameter
async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const path = req.path;
  const option = path.split("/")[2];
  let movie = null;

  /* Checks for route options (ex: /movies/:movieId/theaters)
   *  Calls related service function  */
  if (!option) movie = await service.read(movieId);
  else if (option == "theaters") movie = await service.readTheaters(movieId);
  else if (option == "reviews") movie = await service.readReviews(movieId);

  // Store movie in locals and proceed, throw error if movie not available
  if (movie) {
    res.locals.movie = movie;
    return next();
  }

  return next({ status: 404, message: "Movie cannot be found." });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
};
