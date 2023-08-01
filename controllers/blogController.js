// Import the Blog model, which was defined in another module and represents a blog document in the MongoDB database
const Blog = require('../models/blog');

// Handler for getting the index page with all blogs, sorted by creation date in descending order
const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 }) // find all blogs and sort them by createdAt in descending order
    .then(result => {
      // when the database query completes successfully, render the 'index' view and pass in the blogs and a title
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      // log any errors that occurred during the database query
      console.log(err);
    });
}

// Handler for getting the details of a specific blog, identified by id
const blog_details = (req, res) => {
  const id = req.params.id; // grab the id from the route parameter
  Blog.findById(id) // find a blog with the specified id
    .then(result => {
      // when the database query completes successfully, render the 'details' view and pass in the blog and a title
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      // if an error occurred (such as the blog not being found), log the error and render the '404' view
      console.log(err);
      res.render('404', { title: 'Blog not found' });
    });
}

// Handler for getting the page to create a new blog
const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create a new blog' }); // render the 'create' view and pass in a title
}

// Handler for creating a new blog
const blog_create_post = (req, res) => {
  const blog = new Blog(req.body); // create a new blog instance with the data from the request body
  blog.save() // save the new blog in the database
    .then(result => {
      // when the save operation completes successfully, redirect to the index page
      res.redirect('/blogs');
    })
    .catch(err => {
      // log any errors that occurred during the save operation
      console.log(err);
    });
}

// Handler for deleting a specific blog, identified by id
const blog_delete = (req, res) => {
  const id = req.params.id; // grab the id from the route parameter
  Blog.findByIdAndDelete(id) // delete the blog with the specified id
    .then(result => {
      // when the delete operation completes successfully, send a JSON response with a redirect instruction
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      // log any errors that occurred during the delete operation
      console.log(err);
    });
}

// The following code exports an object from this module.
// This object contains several properties that are each set to a function defined in this module.
// By exporting them, these functions become accessible in other files which import this module.

module.exports = {
  blog_index,  // 'blog_index' is a function that handles requests to display the index page of blogs.
  blog_details,  // 'blog_details' is a function that handles requests to display the details of a specific blog.
  blog_create_get,  // 'blog_create_get' is a function that handles GET requests to the page where a new blog can be created.
  blog_create_post,  // 'blog_create_post' is a function that handles POST requests to create a new blog.
  blog_delete  // 'blog_delete' is a function that handles requests to delete a specific blog.
}

