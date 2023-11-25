const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String
        }, 
        subject: {
            type: String
        },
        topic: {
            type: String,
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"]
        },
        marks: {
            type: Number,
        }
    }
);

module.exports = mongoose.model("Quesition", QuestionSchema);