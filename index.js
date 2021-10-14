const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");
require('./passport/passport-config');
var passport = require("passport");
app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use(cors());
app.use(bodyParser.json({limit: '60mb'}));
app.use(bodyParser.urlencoded({limit: '60mb', extended: true}));

mongoose.connect('mongodb+srv://fds:fds@cluster0.f7rfq.mongodb.net/fds?retryWrites=true&w=majority', {
    // mongoose.connect('mongodb://localhost:27017/connectifyDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
    console.log('cnx failed');
    });

const AuthRoute = require('./Routes/Authentification');
app.use('/api/user',AuthRoute);

const AvocatRoute = require('./Routes/Avocat');
app.use('/api/avocat',AvocatRoute);

const ClientRoute = require('./Routes/Client');
app.use('/api/client',ClientRoute);

const eventRoute = require('./Routes/Event');
app.use('/api/event',eventRoute);

const grouproute = require('./Routes/Group');
app.use('/api/group',grouproute);

const postRoute = require('./Routes/Post');
app.use('/api/post',postRoute);

const suivie = require('./Routes/suivie');
app.use('/api/suivie',suivie);

const produit = require('./Routes/Produit');
app.use('/api/produit',produit);

const panier = require('./Routes/panier');
app.use('/api/panier',panier);




app.get('/auth/google',passport.authenticate('google', { scope: ["profile", "email"]}));


app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
      console.log(req.user);
    // Successful authentication, redirect home.
    res.redirect(`http://localhost:4200/apps/calendar/${req.user.code}`);
});
const RendezvousRoute = require('./Routes/rendezvous');
app.use('/api/rendezvous',RendezvousRoute);
app.get("/fail", (req, res) => {
    res.send("Failed attempt");
  });
app.listen(3000 , () => console.log("server running perfectly in local"));

