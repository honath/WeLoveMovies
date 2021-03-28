const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./theaters.service");

// Get all theaters + movies for each theater
async function list(req, res) {
  const theaterList = await service.list();

  res.status(200).json({ data: theaterList });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
