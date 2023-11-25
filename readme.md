# Question Paper Generator

This is a Node.js application for generating question papers based on predefined criteria.


### Logic Explanation
This document provides an overview of the logic behind the Question Paper Generator application.

## 1. Add a New Question

### Endpoint

- **Path:** `/addQuestion`
- **Method:** POST

### Request Payload

```json
{
  "question": "Sample question?",
  "subject": "Physics",
  "topic": "Mechanics",
  "difficulty": "Easy",
  "marks": 10
}
```

### Response Payload
``` json
{
  "success": true,
  "message": "New question created",
  "data": {
    "question": "Sample question?",
    "subject": "Physics",
    "topic": "Mechanics",
    "difficulty": "Easy",
    "marks": 10,
    "_id": "some-unique-id"
  }
}
```


## 2. Generate Question Paper
To generate a question paper, make a POST request to /generate-paper with the following JSON payload in the request body:

### Endpoint

- **Path:** `/generateQuestionPaper`
- **Method:** POST

### Request Payload

``` json
{
  "totalMarks": 100,
  "difficulty": {
    "easy": 20,
    "medium": 50,
    "hard": 30
  }
}

```

### Request Payload
``` json
{
  "success": true,
  "message": "Paper generated successfully",
  "data": {
    "easyQuestion": [...],
    "mediumQuestion": [...],
    "hardQuestion": [...]
  }
}

```

1. Add a New Question:

The /add-question endpoint allows the addition of a new question with specified attributes (question, subject, topic, difficulty, marks).
The application validates the request payload, ensuring all required fields are present.
If successful, the new question is created and returned in the response.

2. Generate Question Paper:

The /generate-paper endpoint generates a question paper based on specified criteria (total marks and difficulty distribution).
The total marks are divided among different difficulty levels (easy, medium, hard) according to the specified distribution.
The application retrieves questions from the Question Store for each difficulty level and randomly selects questions until the allocated marks are reached.
The generated question paper is returned in the response.

## Getting Started

Follow these steps to run the application locally:

### Prerequisites

Ensure you have Node.js and npm installed on your machine.

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Clone the Repository

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/your-username/question-paper-generator.git
    ```

2. Change into the project directory:

    ```bash
    cd question-paper-generator
    ```

### Install Dependencies

Install the required Node.js packages:

```bash
npm install
```

### Configure the Application
Make sure to configure any necessary settings, such as the MongoDB connection details, in the application files.

## Start the Application
Run the following command to start the application:

``` bash
npm run dev 
```

### Test the Endpoints
Use tools like curl or Postman to test the /add-question and /generate-paper endpoints.