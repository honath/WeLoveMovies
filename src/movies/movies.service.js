const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// Use mapProperties to format info into a single "critics" key
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

// Get all movies, no condition
function list() {
  return knex("movies").select("*");
}

// Get all movies where is_showing == true
function listAllShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ is_showing: true })
    .groupBy("m.movie_id");
}

// Get movie where movie_id matches given movie ID
function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

// Get all theaters where movie is available (by movie ID)
function readTheaters(movieId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.movie_id")
    .where({ "mt.movie_id": movieId });
}

// Get all reviews (with formatted "critics" key) for a given movie ID
function readReviews(movieId) {
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "r.movie_id": movieId })
    .then((result) => {
      const movieList = [];
      result.forEach((item) => {
        const formattedItem = addCritic(item);
        movieList.push(formattedItem);
      });

      return movieList;
    });
}

module.exports = {
  list,
  listAllShowing,
  read,
  readTheaters,
  readReviews,
};
