var express = require("express");
var app = express(); //initiate 
var db = require("./database.js");
var bodyParser = require("body-parser");
const { request, response } = require("express");
app.use(bodyParser.json());

let HTTP_PORT = 8000;

app.listen(HTTP_PORT, () => {
    console.log("Server is running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//API ROUTES

//routes for navigating across the website 
app.get("/", (req, res)=>{
    res.sendFile('frontend/homepage.html' , { root : __dirname});
});
app.get("/api/addproduct", (req, res)=>{
    res.sendFile('frontend/addProducts.html' , { root : __dirname});
});
app.get("/api/viewproducts", (req, res)=>{
    res.sendFile('frontend/viewProducts.html' , { root : __dirname});
});
app.get("/api/updateproduct", (req, res)=>{
    res.sendFile('frontend/updateProduct.html' , { root : __dirname});
});
app.get("/api/deleteproduct", (req, res)=>{
    res.sendFile('frontend/deleteProduct.html' , { root : __dirname});
});

//routes for CRUD operations 

//api to add a product
app.post("/api/products/add", (req, res, next) => {
    try {
        var errors = [];

        if (!req.body) {
            errors.push("An invalid input");
        }
        const productName= req.body.name //accessing inputs using the name of the HTML element 
        const description= req.body.desc
        const category= req.body.category
        const brand = req.body.brand
        const expiredDate = req.body.exp
        const manufacturedDate = req.body.manu
        const batchNumber = req.body.batch
        const unitPrice = req.body.price
        const quantity = req.body.quantity
        const createdDate = req.body.date

        var sql = "INSERT INTO products (productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? )"; 
        var params = [productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate];

        db.run(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            else {
                res.status(200).send(`Product ${productName} has been addded successfully! Please return to the homepage.`);
            }
        });
    }
    catch (err) {
        res.status(400).send(err);
    };
});

//api to get products
app.get("/api/products/view", (req, res, next) => {
    try {
        var sql = "select * from products";
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.status(200).json({
                "data": rows
            })
        })
    }
    catch (err) {
        res.status(400).send(err);
    }
});

//api to update a product's data
app.post("/api/products/update", (req, res, next) => { //post instead of put because HTML forms only support GET and POST methods by default.

    const id = req.body.id
    const productName= req.body.name
    const description= req.body.desc
    const category= req.body.category
    const brand = req.body.brand
    const expiredDate = req.body.exp
    const manufacturedDate = req.body.manu
    const batchNumber = req.body.batch
    const unitPrice = req.body.price
    const quantity = req.body.quantity
    const createdDate = req.body.date


    db.run(`UPDATE products set productName=?, description=?, category=?, brand=?, expiredDate=?, manufacturedDate=?, batchNumber=?, unitPrice=?, quantity=?, createdDate=? WHERE id=?`,
        [productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate, id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message });
                return;
            }
            res.status(200).send(`Product ${productName} has been updated successfully! Please return to the homepage.`);
        });
});
    
//api to delete a particular product 
app.delete("/api/products/delete/:id", (req, res, next) => {
    try {
        db.run('DELETE FROM products WHERE id=?',
            req.params.id,
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                res.json({
                    "message": "deleted",
                    rows: this.changes
                });
            });
    }
    catch (err) {
        res.status(400).send(err);
    }
});


