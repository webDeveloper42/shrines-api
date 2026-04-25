const Shrine = require("../models/shrine");

const getShrines = (req, res, next) => {
  const { country, search, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (country) filter.country = new RegExp(country, "i");
  if (search) filter.name = new RegExp(search, "i");

  const skip = (Number(page) - 1) * Number(limit);

  Promise.all([
    Shrine.find(filter).skip(skip).limit(Number(limit)),
    Shrine.countDocuments(filter),
  ])
    .then(([shrines, total]) =>
      res.json({
        data: shrines,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / Number(limit)),
        },
      })
    )
    .catch(next);
};

const getShrine = (req, res, next) => {
  Shrine.findById(req.params.id)
    .then((shrine) => {
      if (!shrine) return res.status(404).json({ error: "Shrine not found." });
      res.json({ data: shrine });
    })
    .catch(next);
};

const createShrine = (req, res, next) => {
  const { name, location, address, country, coordinates } = req.body;
  Shrine.create({ name, location, address, country, coordinates })
    .then((shrine) => res.status(201).json({ data: shrine }))
    .catch(next);
};

const updateShrine = (req, res, next) => {
  const { name, location, address, country, coordinates } = req.body;
  Shrine.findByIdAndUpdate(
    req.params.id,
    { name, location, address, country, coordinates },
    { new: true, runValidators: true }
  )
    .then((shrine) => {
      if (!shrine) return res.status(404).json({ error: "Shrine not found." });
      res.json({ data: shrine });
    })
    .catch(next);
};

const deleteShrine = (req, res, next) => {
  Shrine.findByIdAndDelete(req.params.id)
    .then((shrine) => {
      if (!shrine) return res.status(404).json({ error: "Shrine not found." });
      res.json({ message: "Shrine deleted." });
    })
    .catch(next);
};

module.exports = { getShrines, getShrine, createShrine, updateShrine, deleteShrine };
