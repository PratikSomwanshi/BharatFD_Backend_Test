const {
    RAPID_TRANSLATE_API_KEY,
    RAPID_API_HOST,
} = require("../../configs/env_variables");

const translateText = async (text, lang) => {
    try {
        const url =
            "https://google-translate113.p.rapidapi.com/api/v1/translator/text";
        const options = {
            method: "POST",
            headers: {
                "x-rapidapi-key": RAPID_TRANSLATE_API_KEY,
                "x-rapidapi-host": RAPID_API_HOST,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "en",
                to: lang,
                text,
            }),
        };

        const res = await fetch(url, options);
        if (!res.ok) {
            console.log(await res.json());
            throw new Error("Translation failed");
        }
        const result = await res.json();

        return result.trans;
    } catch (error) {
        console.error("Translation error:", error);
        return text;
    }
};

module.exports = { translateText };
