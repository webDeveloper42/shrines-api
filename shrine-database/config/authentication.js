const { v4: uuidv4 } = require("uuid");

const generateApiKey = () => `shrines_${uuidv4().replace(/-/g, "")}`;

module.exports = { generateApiKey };
