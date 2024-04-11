require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./database/db');
const userRouter = require('./routes/auth');
const enquiryRouter = require('./routes/enquiryRouter');


connectDB();
const cors = require('cors');
const path = require('path')

const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// allow cors
app.use(cors());



// app.get('/', (req, res) => {
//     res.send("hello world");
// })

// Routes
app.use('/api/user', userRouter);
app.use('/api/user', enquiryRouter);

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });


// Parse incoming request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));