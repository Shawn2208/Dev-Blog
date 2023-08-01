// load the express module, which is a web application framework for Node.js
const express = require('express');

// load the blogController module, which contains logic related to blog operations
const blogController = require('../controllers/blogController');

// create a new Router object from express. This router object can be used to define routes
const router = express.Router();

// define a GET route at '/create' that will execute the blogController.blog_create_get function when accessed
router.get('/create', blogController.blog_create_get);

// define a GET route at '/' that will execute the blogController.blog_index function when accessed
router.get('/', blogController.blog_index);

// define a POST route at '/' that will execute the blogController.blog_create_post function when a POST request is made to this route
router.post('/', blogController.blog_create_post);

// define a GET route at '/:id' that will execute the blogController.blog_details function when accessed. Here, ':id' is a dynamic part of the URL, it's a route parameter
router.get('/:id', blogController.blog_details);

// define a DELETE route at '/:id' that will execute the blogController.blog_delete function when a DELETE request is made to this route. Again, ':id' is a dynamic part of the URL, representing the id of the blog post to delete
router.delete('/:id', blogController.blog_delete);

// export the router object so it can be imported in other files. This makes the routes defined on this router available to the rest of the application
module.exports = router;
