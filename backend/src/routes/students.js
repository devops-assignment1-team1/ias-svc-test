//Creating express application
const express = require("express")
const router = express()

//Declaring and connecting to database
const mysql = require('mysql2')
const con = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'db'
})

//Middleware
router.use((req, res, next) => {
    console.log('Test')
    next()
})

//Get request for getting all students from database 
// api/v1/students
router.get('/', (req, res) => {
    con.connect(error => {
        if (error) throw error
        console.log('Connected!')

        con.query('SELECT * FROM student', (error, results) => {
            console.log("hi!")
            if (error) throw error
            res.send(results) 
            return
        })
    })
})

function sum(a, b) {
    return a + b;
  }
module.exports = sum;

module.exports = router