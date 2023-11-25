const express = require("express");
const router = express.Router();

// Import Cointrollers
const {addQuestion, generateQuestionPaper} = require("../controllers/Question");

// Create Routes
// addQuestion
router.post("/addQuestion", addQuestion);

// generateQuestionPaper
router.post("/generateQuestionPaper", generateQuestionPaper);

module.exports = router;