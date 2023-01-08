const express = require('express')
const router = express.Router()

const XLSX = require('xlsx')

const mysql = require('mysql')
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

router.use(express.json())

router.get('/', (req, res) => {
    con.connect(error => {
        if (error) throw error
        console.log('Connected!')

        con.query('SELECT * FROM company', (error, results) => {
            if (error) throw error
            res.send(results)
        })
    })
    con.end()
})

router.post('/upload', (req, res) => {
    con.connect(error => {
        if (error) throw error
        console.log('Connected!')

        const companyDataExcel = XLSX.readFile('./././database/internship data/<int period>/student<datetime>.xlsx')
        const companyData = companyDataExcel.companyDataExcel[companyData.SheetNames[0]]

        // loop through rows
        const rows = XLSX.utils.sheet_to_json(companyData, { header: 1 })
        rows.array.forEach(row => {
            // insert row into sql
            const query = "INSERT INTO companyData (column1, column2, ...) VALUES (?, ?, ...) ON DUPLICATE KEY UPDATE column1 = ?, column2 = ?, ..."
            con.query(query, [...row, ...row], (error, result) => {
                if (error) throw error
            })
        });
        con.end()
    })
})

module.exports = router