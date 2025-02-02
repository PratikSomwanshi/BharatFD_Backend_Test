const {
    RAPID_TRANSLATE_API_KEY,
    RAPID_API_HOST,
} = require("../../configs/env_variables");

const translateText = async (text, lang) => {
    try {
        const url =
            "https://deep-translate1.p.rapidapi.com/language/translate/v2";
        const options = {
            method: "POST",
            headers: {
                "x-rapidapi-key": RAPID_TRANSLATE_API_KEY,
                "x-rapidapi-host": RAPID_API_HOST,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                q: text,
                source: "en",
                target: lang,
            }),
        };

        const res = await fetch(url, options);
        if (!res.ok) {
            console.log(await res.json());
            throw new Error("Translation failed");
        }
        const result = await res.json();

        console.log(result);

        return result.data.translations.translatedText;
    } catch (error) {
        console.error("Translation error:", error);
        return text;
    }
};

module.exports = { translateText };
