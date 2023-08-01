// require the necessary modules for the application
const express = require('express'); // express is a web application framework
const morgan = require('morgan'); // morgan is a HTTP request logger middleware for node.js
const mongoose = require('mongoose'); // mongoose is an ODM (Object Data Modeling) tool for MongoDB and Node.js
const blogRoutes = require('./routes/blogRoutes'); // custom module that defines routes for the blog
const _ = require('lodash'); // lodash is a JavaScript utility library for JavaScript

// create a new express application
const app = express();

// set the view engine for the application to EJS (Embedded JavaScript templates)
app.set('view engine', 'ejs');

app.use(express.static('public')); // serve static files (like CSS, images, etc.) from the "public" directory
app.use(express.urlencoded({ extended: true })); // middleware for parsing URL-encoded bodies



mongoose.connect('mongodb+srv://shawn2208:password@cluster0.i9kflny.mongodb.net/node-tuts', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async (result) => {
    let port = process.env.PORT;
    if (port == null || port === '') {
      port = 3000;
    }
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));


// middleware & static files
app.use(morgan('dev')); // use morgan for logging HTTP requests
app.use((req, res, next) => {
  res.locals.path = req.path; // middleware that adds the current request path to the response object
  next(); // proceed to the next middleware
});

// define a route for the root ("/") path, which redirects to "/blogs"
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// define a route for the "/about" path
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' }); // render the "about" view with the title 'About'
});

// use the routes defined in the blogRoutes module for any path starting with "/blogs"
app.use('/blogs', blogRoutes);

// catch-all route for handling 404 errors (i.e., when no other route matches the requested path)
app.use((req, res) => {
  res.status(404).render('404', { title: '404' }); // render the "404" view with the title '404'
});
