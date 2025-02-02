const request = require("supertest");
const express = require("express");
const router = require("../../routes/v1/faq_routes");

const faqController = require("../../controllers/faq_controller");
jest.mock("../../controllers/faq_controller");

const { faqMiddleware } = require("../../middlewares/faq_middleware");
jest.mock("../../middlewares/faq_middleware", () => ({
    faqMiddleware: (req, res, next) => next(),
}));

const app = express();
app.use(express.json());
app.use("/api/v1/faq", router);

describe("FAQ API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/faq", () => {
        it("should call getAllFAQs and return a list of FAQs", async () => {
            // Simulate a successful response from the controller.
            faqController.getAllFAQs.mockImplementation((req, res) => {
                res.status(200).json({
                    data: [{ id: "1", question: "Test Q", answer: "Test A" }],
                });
            });

            const res = await request(app).get("/api/v1/faq");

            expect(faqController.getAllFAQs).toHaveBeenCalled();
            expect(res.statusCode).toEqual(200);
            expect(res.body.data).toHaveLength(1);
        });
    });

    describe("GET /api/v1/faq/:id", () => {
        it("should call getSingleFaq and return a single FAQ", async () => {
            faqController.getSingleFaq.mockImplementation((req, res) => {
                res.status(200).json({
                    data: {
                        id: req.params.id,
                        question: "Single Q",
                        answer: "Single A",
                    },
                });
            });

            const res = await request(app).get("/api/v1/faq/1");

            expect(faqController.getSingleFaq).toHaveBeenCalled();
            expect(res.statusCode).toEqual(200);
            expect(res.body.data.id).toEqual("1");
        });
    });

    describe("POST /api/v1/faq", () => {
        it("should call createFAQ and return the created FAQ", async () => {
            const newFaq = { question: "New FAQ", answer: "New Answer" };
            faqController.createFAQ.mockImplementation((req, res) => {
                res.status(201).json({ data: req.body });
            });

            const res = await request(app).post("/api/v1/faq").send(newFaq);

            expect(faqController.createFAQ).toHaveBeenCalled();
            expect(res.statusCode).toEqual(201);
            expect(res.body.data).toEqual(newFaq);
        });
    });

    describe("PUT /api/v1/faq/:id", () => {
        it("should call updateFAQ and return the updated FAQ", async () => {
            const updatedFaq = {
                question: "Updated FAQ",
                answer: "Updated Answer",
            };
            faqController.updateFAQ.mockImplementation((req, res) => {
                res.status(200).json({
                    data: { ...req.body, id: req.params.id },
                });
            });

            const res = await request(app)
                .put("/api/v1/faq/1")
                .send(updatedFaq);

            expect(faqController.updateFAQ).toHaveBeenCalled();
            expect(res.statusCode).toEqual(200);
            expect(res.body.data).toEqual({ ...updatedFaq, id: "1" });
        });
    });

    describe("DELETE /api/v1/faq/:id", () => {
        it("should call deleteFaq and return a success message", async () => {
            faqController.deleteFaq.mockImplementation((req, res) => {
                res.status(200).json({ message: "FAQ deleted successfully" });
            });

            const res = await request(app).delete("/api/v1/faq/1");

            expect(faqController.deleteFaq).toHaveBeenCalled();
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual("FAQ deleted successfully");
        });
    });
});
