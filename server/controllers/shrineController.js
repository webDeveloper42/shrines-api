const ShrineRepository = require("../repositories/ShrineRepository");

const getShrines = async (req, res, next) => {
  try {
    const { search, country, page = 1, limit = 20 } = req.query;
    const filter = ShrineRepository.buildFilter({ search, country });
    const skip = (Number(page) - 1) * Number(limit);

    const [shrines, total] = await Promise.all([
      ShrineRepository.findAll({ filter, skip, limit: Number(limit) }),
      ShrineRepository.count(filter),
    ]);

    res.json({
      data: shrines,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    next(err);
  }
};

const getShrine = async (req, res, next) => {
  try {
    const shrine = await ShrineRepository.findById(req.params.id);
    if (!shrine) return res.status(404).json({ error: "Shrine not found." });
    res.json({ data: shrine });
  } catch (err) {
    next(err);
  }
};

const createShrine = async (req, res, next) => {
  try {
    const { name, location, address, country, coordinates } = req.body;
    const shrine = await ShrineRepository.create({ name, location, address, country, coordinates });
    res.status(201).json({ data: shrine });
  } catch (err) {
    next(err);
  }
};

const updateShrine = async (req, res, next) => {
  try {
    const { name, location, address, country, coordinates } = req.body;
    const shrine = await ShrineRepository.updateById(req.params.id, {
      name, location, address, country, coordinates,
    });
    if (!shrine) return res.status(404).json({ error: "Shrine not found." });
    res.json({ data: shrine });
  } catch (err) {
    next(err);
  }
};

const deleteShrine = async (req, res, next) => {
  try {
    const shrine = await ShrineRepository.deleteById(req.params.id);
    if (!shrine) return res.status(404).json({ error: "Shrine not found." });
    res.json({ message: "Shrine deleted successfully." });
  } catch (err) {
    next(err);
  }
};

module.exports = { getShrines, getShrine, createShrine, updateShrine, deleteShrine };
