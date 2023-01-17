const con = require("../../db");
const returnSuccess = require("../../utils");
const returnError = require("../../utils");
const express = require("express");
const router = express.Router();

const GET = router.get('/', (req, res) => {
    con.connect(error => {
        if (error) throw error;

        con.query('SELECT * FROM student', (error, results) => {
            if (error) throw error;
            returnSuccess(res, results);
        })
    })
});

module.exports = GET;
