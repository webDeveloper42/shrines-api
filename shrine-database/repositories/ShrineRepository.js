const Shrine = require("../models/shrine");

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

class ShrineRepository {
  static async findAll({ filter = {}, skip = 0, limit = 20 } = {}) {
    return Shrine.find(filter).skip(skip).limit(limit).lean();
  }

  static async count(filter = {}) {
    return Shrine.countDocuments(filter);
  }

  static async findById(id) {
    return Shrine.findById(id).lean();
  }

  static async create(data) {
    return Shrine.create(data);
  }

  static async updateById(id, data) {
    return Shrine.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
  }

  static async deleteById(id) {
    return Shrine.findByIdAndDelete(id).lean();
  }

  static buildFilter({ search, country } = {}) {
    const filter = {};
    if (search) filter.name = new RegExp(escapeRegex(search), "i");
    if (country) filter.country = new RegExp(escapeRegex(country), "i");
    return filter;
  }
}

module.exports = ShrineRepository;
