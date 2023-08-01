// import the mongoose module, which provides a straightforward, schema-based solution to model your application data with MongoDB
const mongoose = require('mongoose');

// grab the Schema constructor from the mongoose module. Schemas define the structure of documents within a collection in MongoDB
const Schema = mongoose.Schema;

// create a new instance of a Schema with the structure of a blog. This will define what fields a blog has and what type those fields are
const blogSchema = new Schema({
  // define a 'title' field of type String. The 'required: true' option makes this field mandatory
  title: {
    type: String,
    required: true,
  },
  // define a 'snippet' field of type String, which is also mandatory
  snippet: {
    type: String,
    required: true,
  },
  // define a 'body' field of type String, which is also mandatory
  body: {
    type: String,
    required: true
  },
}, 
// enable automatic creation of 'createdAt' and 'updatedAt' fields
{ timestamps: true });

// create a Model from the defined schema. Models are constructors compiled from Schema definitions. An instance of a model represents a MongoDB document and can be saved in the database
// 'Blog' is the name of the model. Mongoose will create a collection named 'blogs' (lowercase, plural) in the database
const Blog = mongoose.model('Blog', blogSchema);

// export the Blog model so it can be imported and used in other parts of the application to interact with the 'blogs' collection in the database
module.exports = Blog;
