const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.use(morgan('dev'));

//Connecting to mongdodb uisng mongoose;
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const statsRouter = require('./api/routes/stats');
// const usersRouter = require('./routes/users');

app.use('/stats', statsRouter);

//Listening on port 5000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
