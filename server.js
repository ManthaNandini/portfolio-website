const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// MONGODB CONNECTION
// ======================
const MONGO_URI =
"mongodb://sabiyakousar999_db_user:sabiya123@ac-h57n420-shard-00-00.51gdmc8.mongodb.net:27017,ac-h57n420-shard-00-01.51gdmc8.mongodb.net:27017,ac-h57n420-shard-00-02.51gdmc8.mongodb.net:27017/portfolio?ssl=true&replicaSet=atlas-w1p2yz-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster1";

mongoose.connect(MONGO_URI)
.then(() => {

    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

})
.catch((err) => {
    console.log("MongoDB Error:", err);
});

// ======================
// PROJECT SCHEMA
// ======================
const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String
});

const Project = mongoose.model("Project", ProjectSchema);

// ======================
// CONTACT SCHEMA
// ======================
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model("Contact", ContactSchema);

// ======================
// ROUTES
// ======================

// Home route
app.get('/', (req, res) => {
    res.send('Portfolio Backend Running');
});

// ======================
// CONTACT ROUTE
// ======================
app.post('/contact', async (req, res) => {

    try {

        const { name, email, message } = req.body;

        const newMessage = new Contact({
            name,
            email,
            message
        });

        await newMessage.save();

        res.status(200).json({
            message: 'Message sent successfully'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Error sending message'
        });
    }
});

// ======================
// GET PROJECTS
// ======================
app.get('/projects', async (req, res) => {

    try {

        const projects = await Project.find();

        res.json(projects);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});