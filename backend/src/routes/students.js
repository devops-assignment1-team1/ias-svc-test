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
            if (error) throw error
            res.send(results) 
            return
        })
    })
})

router.post('/newstudent', async (req, res) => {
    //const { studentid, name,preference,status,company_id } = req.body
    console.log("passing")
    con.connect(error => {
        if (error) throw error
        console.log('Connected!')
            const query = "INSERT INTO student (student_id,name,preference,status,company_id) VALUES(?,?,?,?,?)" 
            con.query(query, ["s10205479","lincoln","Software","UNASSIGNED", null], (error, result) => {
                if (error) throw error
                console.log("test")
                res.send(result)
                return
            })

    })
})

router.delete('/deleteStudent', async (req, res) => {
    const { studentid, name,preference,status,company_id } = req.body
  
    con.connect(error => {
        if (error) throw error
        console.log('Connected!')
            const query = "DELETE FROM student WHERE student_id = 's10205479'" 
            con.query(query, ["s10205479"], (error, result) => {
                if (error) throw error
                console.log("hi")
                res.send(result)
                return
            })

    })
})



module.exports = router