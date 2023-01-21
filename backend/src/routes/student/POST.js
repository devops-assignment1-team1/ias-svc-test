const con = require("../../db");
const returnSuccess = require("../../utils");
const returnError = require("../../utils");
const express = require("express");
const router = express.Router();
//const multer = require('multer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const fileUpload = require("express-fileupload");
const cors = require("cors");
router.use(express.json())
router.use(cors())
router.use(fileUpload())

// get internship period
async function getInternshipPeriod() {
    const response = await axios.get("http://localhost:5222/api/v1/settings");
    const data = response.data
    const internship_period = data.find(setting => setting.setting_type === 'INTERNSHIP_PERIOD').setting_value;
    return internship_period
}

// get internship period for directory
let internshipPeriod;
getInternshipPeriod().then(period => {
    internshipPeriod = period
})

// upload student file to directory
const POST = router.post("/upload", (req, res)=>{
    console.log(internshipPeriod)
    console.log(req.files.student);
    const filename = req.files.student.name;
    const file = req.files.student
    const uploadPath = path.join(__dirname, 'internshipData', internshipPeriod)
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
    file.mv(path.join(uploadPath, filename),(err)=>{
        if(err){
            return res.send(err);
        }
        else {
            res.json({ message: "Successfully uploaded files" });
        }
    })
})

module.exports = POST;  
