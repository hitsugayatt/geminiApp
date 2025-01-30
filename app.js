const express = require('express');
const app = express();
app.use(express.json());
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyCWvBXfze93N7Gz1mBN2KZ1VPlmQEiU7LI');

app.post('/getResponse', async (req, res)=>{
    console.log(req.body.question);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(req.body.question);
    console.log(result.response.text());
    res.status(200).json({
        response : result.response.text()
    })
}) 

app.get('*', (req,res)=>{
    res.status(404).json({
        msg : 'bad request'
    })
})

module.exports = app;