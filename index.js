const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoute = require("./routes/product.route.js");
const app = express()

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use("/api/products", productRoutes);


// test if server is running
app.get('/', (req, res) =>{
    res.send("Hello from node Api Server");
});

// api to get products
app.get('/api/products', async (req,res) =>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    } catch(error){
        res.status(500).json({message: error. message});
    }
});

// get individual products 
app.get("/api/products/:id", async(req,res) =>{
    try{
        const {id} = req.params;
        const product = awaitProduct.findById(id);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

//post products
app.post('/api/products', async (req,res) =>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

// update a product
app.put('/api/products/:id', async(req,res) =>{
    try{
        const{id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product){
            return res.status(404).json({message:"Product not found"});
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch(error){
        res.status(500).json({message:error.message});
    }
});

//connecting to the mongo db database
mongoose.connect('mongodb+srv://admin:Ebu3aSPa5HknjwyQ@backenddb.au59fci.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
  .then(() => {
    console.log('Connected to the database');
    app.listen(3000, ()=>{
        console.log('Server is running on port 3000');
    });
})
    .catch(() =>{
        console.log("Connection failed");
    });


//delete a product
app.delete('/api/products/:id', async(req,res) =>{
    try{
        const{id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product){
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json({message: "Product deleted successfully"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
});