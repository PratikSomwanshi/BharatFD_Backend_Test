const faqService = require("../../services/faq_service");
const { createResponse } = require("../../utils/response");

const getAllFAQs = async (req, res) => {
    const { lang = "en" } = req.query;
    try {
        const faqs = await faqService.getAllFAQs(lang);
        res.json(createResponse(true, faqs, "FAQs retrieved successfully"));
    } catch (error) {
        res.status(500).json(
            createResponse(false, [], "Something went wrong", error)
        );
    }
};

const createFAQ = async (req, res) => {
    const { question, answer } = req.body;
    try {
        const newFAQ = await faqService.createFAQ(question, answer);
        res.status(201).json(
            createResponse(true, newFAQ, "FAQ created successfully")
        );
    } catch (error) {
        res.status(500).json(
            createResponse(false, [], "Something went wrong", error)
        );
    }
};

const updateFAQ = async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    try {
        const updatedFAQ = await faqService.updateFAQ(id, question, answer);
        res.json(createResponse(true, updatedFAQ, "FAQ updated successfully"));
    } catch (error) {
        res.status(500).json(
            createResponse(false, [], "Something went wrong", error)
        );
    }
};

const getSingleFaq = async (req, res) => {
    const { id } = req.params;
    try {
        const faq = await faqService.getSingleFaq(id);
        res.json(createResponse(true, faq, "FAQ retrieved successfully"));
    } catch (error) {
        res.status(500).json(
            createResponse(false, [], "Something went wrong", error)
        );
    }
};

const deleteFaq = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFAQ = await faqService.deleteFaq(id);
        res.json(createResponse(true, deletedFAQ, "FAQ deleted successfully"));
    } catch (error) {
        res.status(500).json(
            createResponse(false, [], "Something went wrong", error)
        );
    }
};

module.exports = {
    getAllFAQs,
    createFAQ,
    updateFAQ,
    getSingleFaq,
    deleteFaq,
};
