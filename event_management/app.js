

const express = require('express');

const mongodb = require('./config/data')
const app = express();

const bodyParser = require('body-parser');
// app.get('/', (req, res) => {
//     res.send("Hello");
// })

// const router = express.Router();

// app.get('/', (req, res) => {
//     res.send("Hi there!");
// })

app.use(bodyParser.json());


const port = 5001;

app.use('/', require('./routes/'));



mongodb.initdb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log('Web Server is listening at port ' + (port));
    })
  }
});

    app.listen(port, () => {
      console.log("Database listening...")
    });
