require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const urlencoded = require('body-parser/lib/types/urlencoded');
const mysql = require('mysql');
const ejs = require('ejs');

//conecting mysql

var connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: "dataDB"
})

connection.connect((err)=>{
    if(err){
        console.log(err)
    } else {
        console.log("connected to my sql")
    }
})

const app =  express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    console.log("i m getting")
    
    
})

app.post('/:table',(req,res)=>{
    console.log('post is working')
    const Table = req.params.table

    let sql = "SELECT * FROM "+Table+"";
    connection.query(sql,function(err,result, fields){
        if(err){
            console.log(err);
            res.send("table do not exist")
        } else {
            console.log(result);
            // console.log(fields);
            json = Object.values(JSON.parse(JSON.stringify(result)))
            res.send(json);
        }
    })

})

app.post('/post/:postName',(req,res)=>{
    const requestTitle = req.params.postName;

    res.render("post",{title: post.title})
})

app.listen(3000,(req,res)=>{
    console.log("yes! i m listing at 3000")
})