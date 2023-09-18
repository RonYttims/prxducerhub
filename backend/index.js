import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
});

app.use(express.json());

app.use(cors())

app.get("/", function(req, res){
    res.json("This is the backend!");
});

app.get("/sample-packs", function(req, res){
    const q = "SELECT * FROM sample_packs";

    db.query(q, function(err, data){
        if(err){
            return res.json(err);
        }
        else{
            return res.json(data);
        }
    })
});

app.post("/sample-packs", function(req, res){
    const q = "INSERT INTO sample_packs (`title`,`description`,`cover`, `price`, `link`) VALUES(?)";
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price,
        req.body.link
    ];

    db.query(q, [values], function(err, data){
        if(err){
            return res.json(err);
        }
        else{
            return res.json("The sample pack has been created!");
        }
    })
});

// app.get("/user-information/:id", function(req, res){
//     const id = req.params.id;
//     db.query("SELECT * FROM users WHERE id = ?", id, function(err, result){
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     });
//   });

app.delete("/sample-packs/:id", function(req, res){
    const packId = req.params.id;
    const q = "DELETE FROM sample_packs WHERE id = ?";
    db.query(q, [packId], function(err, data){
        if(err){
            return res.json(err);
        }
        else{
            return res.json("The sample pack has been deleted!");
        }
    });
});

app.put("/sample-packs/:id", function(req, res){
    const packId = req.params.id;
    const q = "UPDATE sample_packs SET `title` = ?, `description` = ?, `cover` = ?, `price` = ?, `link` = ? WHERE id = ?";
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price,
        req.body.link
    ];

    db.query(q, [...values, packId], function(err, data){
        if(err){
            return res.json(err);
        }
        else{
            return res.json("The sample pack has been updated!");
        }
    });
});

app.listen(8080, function(){
    console.log("I am listening!");
})