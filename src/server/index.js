import 'dotenv/config';
import express from 'express';
import expressSession from 'express-session';
import users from './users.js';
import auth from './auth.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// We will use __dirname later on to send files back to the client.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Create the Express app
const app = express();
const port = process.env.PORT || 3000;

// Session configuration
const sessionConfig = {
  // set this encryption key in Heroku config (never in GitHub)!
  secret: process.env.SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
};

// Setup the session middleware
app.use(expressSession(sessionConfig));
// Allow JSON inputs
app.use(express.json());
// Allow URLencoded data
app.use(express.urlencoded({ extended: true }));
// Allow static file serving
app.use(express.static('src/client'));
app.use(express.static('src/client/private'));
// Configure our authentication strategy
auth.configure(app);
// Our own middleware to check if the user is authenticated
function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    // If we are authenticated, run the next route.
    next();
  } else {
    // Otherwise, redirect to the login page.
    res.redirect('/');
  }
}

import fs from 'fs';
import path from 'path';

// Define route for serving private HTML page
app.get('/private/:userID/', checkLoggedIn, (req, res) => {
  // Read the HTML file
  fs.readFile(path.resolve(__dirname, 'client/private/private.html'), 'utf8', (err, data) => {
      if (err) {
          // Handle error
          console.error('Error reading HTML file:', err);
          return res.status(500).send('Internal Server Error');
      }

      // Replace the placeholder with the actual username
      const htmlWithUsername = data.replace('USERNAME', req.user);

      // Send the modified HTML to the client
      res.send(htmlWithUsername);
  });
});

app.get('/', checkLoggedIn, (req, res) => {
  res.send('hello world');
  //trying to change the DOM so the login button is now profile
  console.log('MADE IT HERE');
  const loginNavBar = document.getElementById("about");
  loginNavBar.textContent = "Profile";

  
});

// Handle the URL /login (just output the login.html file).
app.get('/login', (req, res) =>
  res.sendFile('client/index.html', { root: __dirname })
);

// Handle post data from the index.html form.
app.post(
  '/login',
  auth.authenticate('local', {
    // use username/password authentication
    successRedirect: '/private', // when we login, go to /private
    failureRedirect: '/', // otherwise, back to login
  })
);

// After successful login, update the welcome message with the user's name
app.post('/login', (req, res) => {
  // Assuming you have a variable `username` containing the user's name
  const username = req.body.username; // Adjust this based on how the username is sent from the login form

  // Update the welcome message with the username
  res.locals.username = username; // Pass the username to the view
  res.redirect('/private');
});

// Handle logging out (takes us back to the login page).
// app.get('/logout', (req, res) => {
//   console.log("hello");
//   req.logout(); // Logs us out!
//   res.redirect('/login'); // back to login
// });
app.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});



// Like login, but add a new user and password IFF one doesn't exist already.
// If we successfully add a new user, go to /login, else, back to /register.
// Use req.body to access data (as in, req.body['username']).
// Use res.redirect to change URLs.
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.addUser(username, password)) {
    res.redirect('/');
  } else {
    res.redirect('/register');
  }
});

// Register URL
app.get('/register', (req, res) =>
  res.sendFile('client/register.html', { root: __dirname })
);

// Private data
app.get(
  '/private',
  checkLoggedIn, // If we are logged in (notice the comma!)...
  (req, res) => {
    // Go to the user's page.
    res.redirect('/private/' + req.user);
  }
);

// A dummy page for the user.
// app.get(
//   '/private/:userID/',
//   checkLoggedIn, // We also protect this route: authenticated...
//   (req, res) => {
//     // Verify this is the right user.
//     if (req.params.userID === req.user) {
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.write('<H1>HELLO ' + req.params.userID + '</H1>');
//       res.write('<br/><a href="/logout">click here to logout</a>');
//       res.write('<br/><a href="/">click here to go back</a>');
//       res.end();
//     } else {
//       res.redirect('/private/');
//     }
//   }
// );
app.get(
  '/private/:userID/',
  checkLoggedIn, // We also protect this route: authenticated...
  (req, res) => {
    // Verify this is the right user.
    if (req.params.userID === req.user) {
      res.sendFile('client/private/private.html', { root: __dirname });
    } else {
      res.redirect('/private/');
    }
  }
);


app.get('*', (req, res) => {
  res.send('Error');
});

app.listen(port, () => {
  console.log(`App now listening at http://localhost:${port}`);
});
