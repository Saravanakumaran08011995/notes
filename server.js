require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const nodeRouter = require('./routes/nodeRouter');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/user', userRouter);
app.use('/api/notes', nodeRouter);

// Connection
const URI = process.env.DATABASE;
mongoose.connect(URI, err => {
    if (err) throw err;
    console.log('Connected to MongoDB');
});

// Route for /
app.get('/', (req, res) => {
    res.send('I am working');
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

// Listen to the server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
