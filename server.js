const express = require("express");
const cors = require("cors");
const app = express();

const v1Routes = require("./routes/v1");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    return res.json({ message: "Welcome to the FAQ API" });
});

app.use("/api", v1Routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
