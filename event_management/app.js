

const express = require('express');

const mongodb = require('./config/data')
const app = express();
// require('dotenv').config();
// require('dotenv').config();

const bodyParser = require('body-parser');
const passport = require('passport');
// require('./middleware/auth');
const session = require('express-session');
const { isAuthenticated } = require('./middleware/auth');

app.use(bodyParser.json());
// app.get('/', (req, res) => {
//   res.send(req.session.user !== undefined ? "Logged in" : "Logged out");
// })
app.use('/', require('./routes/'));


app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());



app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
    // passport.authenticate('google', { scoop: ['email', 'profile'] })
);

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/auth/failure',
    })
);

app.get('auth/failure', (req, res) => {
    res.send("Failed to Authenticate.");
});



// app.get('/', (req, res) => {
//   res.send(req.session.user !== undefined ? `Logged in` : "Logged Out")
// })




  

const port = 5001;

mongodb.initdb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log('Web Server is listening at port ' + (port));
    });
  }
});

    app.listen(port, () => {
      console.log("Database listening...")
    });

module.exports = app
