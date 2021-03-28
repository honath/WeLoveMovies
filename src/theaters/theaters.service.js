const knex = require("../db/connection");

function list() {
  /* Get all theaters
   *  then for each theater/theater ID
   *  map an array of all related movies
   *  to new theater key "movies"
   *  returning the complete "theaters" array */
  return knex("theaters")
    .select("*")
    .then(async (theaters) => {
      return Promise.all(
        theaters.map(async (theater) => {
          theater.movies = await knex("theaters as t")
            .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
            .join("movies as m", "mt.movie_id", "m.movie_id")
            .select("m.*", "mt.theater_id", "mt.is_showing")
            .where({ "mt.theater_id": theater.theater_id });

          return theater;
        })
      );
    });
}

module.exports = {
  list,
};
