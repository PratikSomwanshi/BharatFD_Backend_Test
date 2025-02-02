const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    RAPID_TRANSLATE_API_KEY: process.env.RAPID_API_TRANSLATE_KEY,
    RAPID_API_HOST: process.env.RAPID_API_TRANSLATE_HOST,
};
