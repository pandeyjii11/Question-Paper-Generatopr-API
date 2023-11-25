const express  = require("express");
const app = express();

require("dotenv").config();
const dbConnect = require("./config/Database");
const questionRoutes = require("./routes/QuestionRoutes");

// Import PORT number
const PORT = process.env.PORT || 4000;


// Middlewears
app.use(express.json());


// Mound the API Routes
app.use("/api/v1/question", questionRoutes);


// DB Connect
dbConnect();

// Listen to Server
app.listen(PORT, () => {
    console.log(`Server is up and running at port ${PORT}`);
});

// Default Route
app.get("/", (req, res) => {
    res.status(200).send("<h1>This is Default Route</h1>");
});

