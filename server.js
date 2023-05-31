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

//api to insert a product 
app.post("/api/products", (req, res, next) => {

    try {
        var errors = [];

        if (!req.body) {
            errors.push("An invalid input");
        }

        const { productName,
            description,
            category,
            brand,
            expiredDate,
            manufacturedDate,
            batchNumber,
            unitPrice,
            quantity,
            createdDate
        } = req.body;

        var sql = "INSERT INTO products (productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? )"; 
        var params = [productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate];

        db.run(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            else {
                res.json({
                    "message": "success",
                    "data": req.body,
                    "id": this.lastID
                });
            }
        });
    }
    catch (err) {
        res.status(400).send(err);
    };
});

//api to get products
app.get("/api/products", (req, res, next) => {

    try {
        var sql = "select * from products";
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            })
        })
    }
    catch (err) {
        res.status(400).send(err);
    }
});

//api to update a product
app.put("/api/products/", (req, res, next) => {
    const {
        id,
        productName,
        description,
        category,
        brand,
        expiredDate,
        manufacturedDate,
        batchNumber,
        unitPrice,
        quantity,
        createdDate
    } = req.body;

    db.run(`UPDATE products set productName=?, description=?, category=?, brand=?, expiredDate=?, manufacturedDate=?, batchNumber=?, unitPrice=?, quantity=?, createdDate=? WHERE id=?`,
        [productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate, id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message });
                return;
            }
            res.status(200).json({ updated: this.changes });
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


