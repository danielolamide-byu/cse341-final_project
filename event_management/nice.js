
const express = require('express');
const passport = require('passport');
const session = require('express-session');

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
};
const app = express();
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    res.send("<a href='/auth/google'>Authenticate with Google");
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
    // passport.authenticate('google', { scoop: ['email', 'profile'] })
);

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
);

app.get('auth/failure', (req, res) => {
    res.send("Failed to Authenticate.");
});

app.get('/protected', isLoggedIn, (req, res) => {
    res.send("Hello, You are Authenticated.");
});
