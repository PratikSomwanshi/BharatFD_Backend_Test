const faqMiddleware = (req, res, next) => {
    const { question, answer } = req.body;

    if (!question || !answer) {
        return res
            .status(400)
            .json({ error: "Question and answer are required" });
    }

    next();
};

module.exports = { faqMiddleware };
