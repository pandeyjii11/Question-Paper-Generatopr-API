const Question = require("../models/Question");

exports.addQuestion = async(req, res) => {
    try {
        // Fetch Data from req.body
        const {question, subject, topic, difficulty, marks} = req.body;

        // validate data
        if(!question || !subject || !topic || !difficulty || !marks) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All feilds required",
                }
            );
        }

        // If question already exists
        const isExisting = await Question.find({question: question});
        
        if(!isExisting) {
            return res.status(400).json(
                {
                    success: false, 
                    message: "Quesion already exists",
                }
            );
        }

        // Create DB instance
        const newQuestion = await Question.create({
            question: question,
            subject: subject,
            topic: topic,
            difficulty: difficulty,
            marks: marks
        });

        // return json response with success flag
        res.status(200).json(
            {
                success: true,
                message: "NewQuestion Created",
                data: newQuestion,
            }
        );
    }
    catch(error) {
        console.error(error);
        console.log(error.message);

        // Send Json Response
        res.status(500).json(
            {
                success: false, 
                message: "Internal Server Error",
                error: error.message,
            }
        );
    }
}


generatePaper = (marks, questionArr) => {
    let marksGenerated = 0;
    const included = new Set();
    const questionGenerated = [];
    while(marksGenerated < marks && included.size < questionArr.length) {
        let randomIndex = Math.floor(Math.random() * questionArr.length);
        if(!included.has(randomIndex)) {
            questionGenerated.push(questionArr[randomIndex]);
            included.add(randomIndex);
            marksGenerated+=questionArr[randomIndex].marks;
        }
    }
    return questionGenerated;
}


exports.generateQuestionPaper = async(req, res) => {
    try {
        // Fetch Data from req.body
        const {totalMarks, difficulty} = req.body;

        // Validate Data
        if(!totalMarks || !difficulty) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All Fields are required",
                }
            );
        }

        // Divide the total marks according to the 
        let easyMarks = (difficulty.easy*totalMarks)/100;
        let mediumMarks = (difficulty.medium*totalMarks)/100;
        let hardMarks = (difficulty.hard*totalMarks)/100;
        const easyQuestions = await Question.find({difficulty: "easy"});

        if(!easyQuestions) { 
            return res.status(404).json(
                {
                    success: false, 
                    message: "Easy Questions not found",
                }
            );
        }

        const easyQuestionsGenerated = generatePaper(easyMarks, easyQuestions);

        let marksGenerated = 0;

        for(let i=0;i<easyQuestionsGenerated.length;i++) {
            marksGenerated+=easyQuestionsGenerated[i].marks;
        }

        if(marksGenerated != easyMarks) {
            return res.status(400).json(
                {
                    success: false, 
                    message: "Not Enough Easy Questions",
                }
            );
        }

        const mediumQuestions = await Question.find({difficulty: "medium"});

        if(!mediumQuestions) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Medium Questions not found",
                }
            );
        }

        const mediumQuestionsGenerated = generatePaper(mediumMarks, mediumQuestions);

        marksGenerated = 0;
        
        for(let i=0;i<mediumQuestionsGenerated.length;i++)
        {
            marksGenerated+=mediumQuestionsGenerated[i].marks;
        }

        if(marksGenerated != mediumMarks) {
            return res.status(400).json(
                {
                    success: false, 
                    message: "Not enough Medium Questions",
                }
            );
        }
        
        const hardQuestions = await Question.find({difficulty: "hard"});

        if(!hardQuestions) {
            return res.status(404).json(
                {
                    success: false, 
                    message: "Hard Questions not found",
                }
            );
        }

        const hardQuestionsGenerated = generatePaper(hardMarks, hardQuestions);

        marksGenerated = 0;
        
        for(let i=0;i<hardQuestionsGenerated.length;i++) {
            marksGenerated+=hardQuestionsGenerated[i].marks;
        }

        if(marksGenerated != hardMarks) {
            return res.status(400).json(
                {
                    success: false, 
                    message: "Not Enough Hard Questions",
                }
            );
        }

        const QuestionPaperGenerated = {
            easyQuestion: easyQuestionsGenerated,
            mediumQuestion: mediumQuestionsGenerated,
            hardQuestion: hardQuestionsGenerated,
        }

        return res.status(200).json(
            {
                success: true,
                message: "Paper Generated Successfully",
                data: QuestionPaperGenerated,
            }
        );
    }
    catch(error) {
        console.error(error);
        console.log(error.message);

        // Send JSON response
        res.status(500).json(
            {
                success: false,
                message: "Internal Server Error",
                error: error.message,
            }
        );
    }
}