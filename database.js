var sqlite3 = require("sqlite3").verbose(); 
var md5 = require("md5");

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err)=>{
    if(err){
        console.error(err);
        throw err; 
    }
    else{
        console.log("Connected to the SQLite Database.");
        db.run(`CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            productName text, 
            description text, 
            category text, 
            brand text,
            expiredDate text, 
            manufacturedDate test, 
            batchNumber INTEGER, 
            unitPrice INTEGER, 
            quantity INTEGER, 
            createdDate text 
            )`, (err)=> {
                if(err){
                    //Table already created.
                }
                else{
                    //Table created. Creating some rows.
                    //var insert= "INSERT INTO products (productName, description, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate) VALUES (?,?,?,?,?,?,?,?,?,?)";
                    //db.run(insert, ["White Basmati Rice", "White basmati rice imported from Pakistan. High-quality rice with extra fragnance. Orignally grown.", "Rice", "CIC", "2023.05.04", "2022.02.20", 324567, 1020, 200, "2022.05.31"]);      
                }

            }
        );
    }
}); 

module.exports = db; 