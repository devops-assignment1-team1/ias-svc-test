const con = require("../../db");
const returnSuccess = require("../../utils");
const returnError = require("../../utils");
const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const axios = require('axios')


// enable files upload
router.use(fileUpload({
    createParentPath: true
}));


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

// configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(path.join(__dirname, './internshipData'))) {
            fs.mkdirSync(path.join(__dirname, './internshipData'))
        }

        if(!fs.existsSync(__dirname, `./internshipData/${internshipPeriod}`)) {
            fs.mkdirSync(__dirname, `./internshipData/${internshipPeriod}`)
        }
        
        cb(null, `./internshipData/${internshipPeriod}`)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.o))
    }
})

const upload = multer ({ 
    storage: storage,
    fileFilter: function(req, file, cb) {
        if (!file.originalname.match(/\.(csv|xlsx)$/)) {
            return cb(new Error('Please upload an excel file'))
        }
        cb(null, true)
    }
})



// // upload company file to directory
// const POST = router.post('/upload', upload.single('student-file'), (req, res, next) => {    

//     console.log(req.body)
//     // check file if valid
//     if (!req.file) {
//         console.log(req.body["student-file"])
//         return res.status(400).send('Error uploading file.');
//     }
//     else if (!req.file) {
//         console.log("error1")
//         return res.status(200).send('Success uploading file.');
//     }
//     else if (!req.file) return res.status(500).json(error);

// });

// upload company file to directory
const POST = router.post("/upload", async(req,res)=>{
    
    console.log(req)
    console.log(req.body);
    console.log(req.file);
    res.json({ message: "Successfully uploaded files" });
})

module.exports = POST;  
