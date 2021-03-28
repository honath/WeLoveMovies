const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reviews.service");

// Delete review by ID
async function destroy(req, res) {
  const { reviewId } = req.params;

  await service.delete(reviewId);
  res.sendStatus(204);
}

// Update review by ID then retrieve the updated record
async function update(req, res) {
  const { reviewId } = req.params;

  await service.update(reviewId, req.body.data);
  res.json({ data: await service.getUpdatedRecord(reviewId) });
}

// Validation methods ---------------------------------------------------------
// Check if review exists in DB by review ID
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;

  const review = await service.read(reviewId);

  if (review) return next();

  return next({
    status: 404,
    message: "Review cannot be found.",
  });
}

// Check if PUT body includes at least one field to update
function hasValidData(req, res, next) {
  const { data: { score, content } = {} } = req.body;

  if (!score && !content)
    return next({
      status: 400,
      message: `Please include at least one field to update. Valid fields: score, content`,
    });

  return next();
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [
    asyncErrorBoundary(reviewExists),
    hasValidData,
    asyncErrorBoundary(update),
  ],
};
