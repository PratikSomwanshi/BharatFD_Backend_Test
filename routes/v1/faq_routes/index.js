const express = require("express");
const faqController = require("../../../controllers/faq_controller");
const { faqMiddleware } = require("../../../middlewares/faq_middleware");

const router = express.Router();

router.get("/", faqController.getAllFAQs);
router.get("/:id", faqController.getSingleFaq);
router.post("/", faqMiddleware, faqController.createFAQ);
router.put("/:id", faqMiddleware, faqController.updateFAQ);
router.delete("/:id", faqController.deleteFaq);

module.exports = router;
