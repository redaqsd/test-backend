const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const mongoose = require("mongoose");
const Test = require("./schema");
const cors = require("cors");

app.use(cors({
    origin : ["https://test-app--two.vercel.app/"],
    methods : ["POST","GET"],
    credentials : true
}))


app.get("/test", async(req, res) => {
    const tests = await Test.find({})
    res.status(200).json({tests})
})

app.post("/test", async(req, res) => {
    const test = await Test.create(req.body)
    res.status(201).json({test})
})


const connectDB = async (url) => {
    try {
        await mongoose.connect(url)
        console.log("connected")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`server listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
};

start();
