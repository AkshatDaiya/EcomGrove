const express = require('express');
const app = express()
require('dotenv').config()
const cors = require('cors');
app.use(express.json())
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
mongoose.connect(`${process.env.DB_URL}`)
const Router = require('./routers/api');

// app.use(cors(
//     {
//         origin: [""],
//         methods: ["POST", "GET", "PUT"],
//         credentials:true
//     }
// ))

app.get('/', (req, res) => {
  res.send('hello');
});

const allowedOrigins = ['https://grull-task.vercel.app', 'https://grull-task.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}))

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use('/api', Router)
app.listen(process.env.PORT, () => { console.log(`Api server is running on port no. ${process.env.PORT}`); })
