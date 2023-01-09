const express = require("express")
const router = express.Router()

const mysql = require('mysql2')
const con = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'db'
})

// middleware
router.use((req, res, next) => {
    console.log('Test')
    next()
})

router.get('/', (req, res) => {
    con.connect(error => {
        if (error) throw error
        console.log('Connected!')

        con.query('SELECT * FROM system_settings', (error, results) => {
            if (error) throw error
            res.send(results)
        })
    })
})

module.exports = router
