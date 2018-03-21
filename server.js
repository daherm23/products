var express = require('express');
// Create an Express App
var app = express();

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// use json
app.use(bodyParser.json());

// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './client/dist')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));

// require mongoose
var mongoose = require('mongoose');
// Connect to database
mongoose.connect('mongodb://localhost/ProductManager');
mongoose.Promise = global.Promise;

// create schema and model
let Schema = mongoose.Schema;
let ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 2},
    price: { type: String },
    image: {type: String}},
    {timestamps: true});

let Product = mongoose.model("Product", ProductSchema);

// Routes
// Root Request
// get all products
app.get('/products', function(req, res) {
    Product.find({}, function(err, products) {
        if (err) {  
            console.log("Error retrieving products");
            console.log(err)
            res.json({message: "Error", error: err});
        } 
        // console.log('posts: ', posts)
        res.json({message: "Success", data: products});
    })
})

app.get('/products', (req, res, next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
})

app.get('/products/new', (req, res, next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
})

// get one product
app.get('/products/:id', function(req, res) {
    console.log(req.params.id);
    Product.findOne({_id: req.params.id}, function(err, product) {
        console.log(err);

        // if(err) {
        //     console.log('Error retrieving data');
        //     res.json({message: "Error", error: err})
        // } else { // else console.log that we did well and then redirect to the root route
        //     console.log('Successfully retrieved a product');
        //     res.json({message: "Success", data: product});
        // }

        res.json({message: err, data: product});
    })
})

// create new product
app.post('/products/new', function(req, res) {
    console.log(req.body)
    var product = new Product({title: req.body.title, 
                    price: req.body.price, image: req.body.image});
            
    // Try to save that new product to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    product.save(function(err) {
        // if there is an error console.log that something went wrong!
        if(err) {
            console.log('Error saving new product');
            res.json({message: "Error", error: err})
        } else { // else console.log that we did well and then redirect to the root route
            console.log('Successfully added a product');
            res.json({message: "Success", data: product});
        }
    })
})

// update product
app.put('/products/edit/:id', function(req, res) {
    Product.findOneAndUpdate({_id: req.params.id}, 
                        {$set: { title: req.body.title, price: req.body.price, image: req.body.image}}, 
                        null, function(err) {
        if(err) {
            console.log('Error during product update');
            res.json({message: "Error", error: err})
        } else { // else console.log that we did well and then redirect to the root route
            console.log('Successfully updating a product');
            res.json({message: "Success"});
        }
    })
})

// delete product
app.delete('/products/:id', function(req, res) {
    Product.deleteOne({_id: req.params.id}, function(err) {
        if(err) {
            console.log('Error during delete');
            res.json({message: "Error", error: err})
        } else { // else console.log that we did well and then redirect to the root route
            console.log('Successfully deleting a product');
            res.json({message: "Success"});
        }
    })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("Product Manager listening on port 8000");
})