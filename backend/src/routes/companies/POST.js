const con = require("../../db");
const returnSuccess = require("../../utils");
const returnError = require("../../utils");
const express = require("express");
const router = express.Router();
const multer = require('multer');

// get internship period
async function getInternshipPeriod() {
    const response = await fetch("http://localhost:5222/api/v1/settings")
    const data = await response.json();
    const internship_period = data.find(setting => setting.setting_type === 'INTERNSHIP_PERIOD').setting_value;
    return internship_period
}


// configure storage
const studentDataStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'internshipData/${internshipPeriod}');
    },
    filename: (rweq, file, cb) => {
        cb(null, 'student-${Date.now()}')
    }
})
const studentDataUpload = multer({ studentDataStorage });

// configure storage
const companyDataStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'internshipData/${internshipPeriod}');
    },
    filename: (rweq, file, cb) => {
        cb(null, 'company-${Date.now()}')
    }
})
const companyDataUpload = multer({ companyDataStorage });

// upload files according to directories
const POST = router.post('/upload', upload.array('excel-files, 2'), (req, res, next) => {

    // get internship period for directory
    getInternshipPeriod()

    // check file if valid and how many files to allow single or multiple file uploads
    if(!req.files) return res.status(400).send('File not found.');

    // if single file
    if(req.files.length === 1) {
        // handle single file
        // connect to database and query
    } else {
        // handle array
        // connect to database and query
    }
    
    // con.connect(error => {
    //     if (error) throw error;

    //     const body = req.body;
    //     if (body.email_dir === undefined) return returnError(res, ["email_dir"]);
    //     if (body.resume_dir === undefined) return returnError(res, ["resume_dir"]);
    //     if (body.internship_period === undefined) return returnError(res, ["internship_period"]);

    //     con.query(
    //         ` 
    //         UPDATE system_settings
    //         SET setting_value = CASE setting_type
    //                                 WHEN "RESUME_DIRECTORY" THEN ?
    //                                 WHEN "EMAIL_DIRECTORY" THEN ?
    //                                 WHEN "INTERNSHIP_PERIOD" THEN ?
    //                             END
    //         WHERE setting_type IN("RESUME_DIRECTORY", "EMAIL_DIRECTORY", "INTERNSHIP_PERIOD");
    //         `,
    //         [body.resume_dir, body.email_dir, body.internship_period],
    //         function(error, results, fields){
    //             if (error) throw error;
    //             returnSuccess(res, { "result": "success" });
    //         }
    //     );
    // })
})

module.exports = POST;