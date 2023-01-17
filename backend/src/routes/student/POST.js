const con = require("../../db");
const returnSuccess = require("../../utils");
const returnError = require("../../utils");
const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

// get internship period
async function getInternshipPeriod() {
    const response = await axios.get("http://localhost:5222/api/v1/settings");
    const data = response.data
    const internship_period = data.find(setting => setting.setting_type === 'INTERNSHIP_PERIOD').setting_value;
    return internship_period
}

// get internship period for directory
const internshipPeriod = getInternshipPeriod()

// configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./internshipData/${internshipPeriod}`);
    },
    filename: (rweq, file, cb) => {
        cb(null, `student-${Date.now()}`)
    }
})

// upload company file to directory
const POST = router.post('/upload', storage.single('student-file'), (req, res, next) => {

    // check file if valid
    if(!req.file) return res.status(400).send('File not found.');

    // make directory according to internship period
    try {
        fs.mkdirSync(`./internshipData/${internshipPeriod}`, { recursive: true }, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Directory created successfully');
            }
        });
    } catch (err) {
        if (err.code !== 'EEXIST') throw err;
    }
    // handle single file
    // connect to database and query
    upload(req, res, function (err) {
        if (err) {
            return res.status(400).send({ message: 'Error uploading file' });
        }
        // process data
        return res.status(200).send({ message: 'Success uploading file' })
    });
});

module.exports = POST;