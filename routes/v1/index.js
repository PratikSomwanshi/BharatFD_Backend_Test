const express = require("express");

const faqRoutes = require("./faq_routes");

const router = express.Router();

router.use("/v1/faq", faqRoutes);

module.exports = router;
