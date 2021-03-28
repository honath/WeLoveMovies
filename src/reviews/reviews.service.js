const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// Use mapProperties to format info into a single "critics" key
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

// Get review by review ID - currently only used for validating record's existence
function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

// Delete review by review ID
function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

// Update review by review ID
function update(reviewId, updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .update(updatedReview, "*");
}

// After update is run, retrieve (and format) the updated record
function getUpdatedRecord(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .first()
    .then((result) => {
      const updatedRecord = addCritic(result);
      updatedRecord.critic_id = updatedRecord.critic.critic_id;
      return updatedRecord;
    });
}

module.exports = {
  read,
  delete: destroy,
  update,
  getUpdatedRecord,
};
