const functions = require('firebase-functions');
const cors = require('cors');
const app = require('express')();
const FBAuth = require('./util/fbAuth');

const { signUp, login, getAuthenticatedUser, getUserDetails } = require('./handlers/users');
const { createJDoc } = require('./handlers/jdoc');

app.use(cors());

//jdoc routes
app.post("/jdoc", FBAuth, createJDoc);

//User routes
app.post("/signup", signUp);
app.post("/login", login);
app.get('/user', FBAuth, getAuthenticatedUser);
app.get('/user/:username', getUserDetails);

exports.api = functions.https.onRequest(app);