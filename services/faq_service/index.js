const { PrismaClient } = require("@prisma/client");
const { translateText } = require("../../utils/translate");
const { cache } = require("../../utils/cache");

const prisma = new PrismaClient();

const languages = ["en", "hi", "bn"];

const getAllFAQs = async (lang = "en") => {
    if (!languages.includes(lang)) {
        throw new Error("Language not supported");
    }

    const cachedFAQs = await cache.get(`faqs_${lang}`);
    if (cachedFAQs) {
        return JSON.parse(cachedFAQs);
    }

    const faqs = await prisma.fAQ.findMany();
    const translatedFAQs = faqs.map((faq) => ({
        id: faq.id,
        question: faq[`question_${lang}`] || faq.question,
        answer: faq[`answer_${lang}`] || faq.answer,
    }));

    await cache.set(`faqs_${lang}`, JSON.stringify(translatedFAQs));
    return translatedFAQs;
};

const createFAQ = async (question, answer) => {
    const translations = {};

    for (const lang of languages.filter((l) => l !== "en")) {
        translations[`question_${lang}`] = await translateText(question, lang);
        translations[`answer_${lang}`] = await translateText(answer, lang);
    }

    const newFAQ = await prisma.fAQ.create({
        data: {
            question,
            answer,
            ...translations,
        },
    });

    for (const lang of languages) {
        await cache.delete(`faqs_${lang}`);
    }

    return newFAQ;
};

const updateFAQ = async (id, question, answer) => {
    const faq = await prisma.fAQ.findUnique({ where: { id: parseInt(id) } });
    if (!faq) throw new Error("FAQ not found");

    const translations = {};
    for (const lang of languages.filter((l) => l !== "en")) {
        translations[`question_${lang}`] = await translateText(question, lang);
        translations[`answer_${lang}`] = await translateText(answer, lang);
    }

    const updatedFAQ = await prisma.fAQ.update({
        where: { id: parseInt(id) },
        data: { question, answer, ...translations },
    });

    for (const lang of languages) {
        await cache.delete(`faqs_${lang}`);
    }
    await cache.delete(`faqs_${id}`);

    return updatedFAQ;
};

const getSingleFaq = async (id) => {
    const cachedFAQ = await cache.get(`faqs_${id}`);
    if (cachedFAQ) return JSON.parse(cachedFAQ);

    const faq = await prisma.fAQ.findUnique({ where: { id: parseInt(id) } });
    if (!faq) throw new Error("FAQ not found");

    await cache.set(`faqs_${id}`, JSON.stringify(faq));
    return faq;
};

const deleteFaq = async (id) => {
    const faq = await prisma.fAQ.findUnique({ where: { id: parseInt(id) } });
    if (!faq) throw new Error("FAQ not found");

    await prisma.fAQ.delete({ where: { id: parseInt(id) } });

    await cache.delete(`faqs_${id}`);
    for (const lang of languages) {
        await cache.delete(`faqs_${lang}`);
    }

    return faq;
};

module.exports = {
    getAllFAQs,
    createFAQ,
    updateFAQ,
    getSingleFaq,
    deleteFaq,
};
