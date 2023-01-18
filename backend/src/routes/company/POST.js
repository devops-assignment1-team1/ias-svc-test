const con = require("../../db");
const returnSuccess = require("../../utils");
const returnError = require("../../utils");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");

const POST = (router) => {
  // get internship period
  async function getInternshipPeriod() {
    const response = await axios.get("http://localhost:5222/api/v1/settings");
    const data = response.data;
    const internship_period = data.find(
      (setting) => setting.setting_type === "INTERNSHIP_PERIOD"
    ).setting_value;
    return internship_period;
  }

  // get internship period for directory
  const internshipPeriod = getInternshipPeriod();

  // configure storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./internshipData/${internshipPeriod}`);
    },
    filename: (req, file, cb) => {
      cb(null, `company-${Date.now()}`);
    },
  });

  const upload = multer({ storage: storage });

  // upload company file to directory
  router.post("/upload", upload.single(`company-${Date.now()}`), (req, res) => {
    console.log("made it");
    // check file if valid
    if (!req.file) return res.status(400).send("File not found.");

    // make directory according to internship period
    try {
      fs.mkdirSync(
        `./internshipData/${internshipPeriod}`,
        { recursive: true },
        (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Directory created successfully");
          }
        }
      );
      // handle single file
      upload(req, res, function (err) {
        console.log("amde it");
        if (err) {
          return res.status(400).send({ message: "Error uploading file" });
        }
        // process data
        console.log("success");
        return res.status(200).send({ message: "Success uploading file" });
      });
    } catch (err) {
      if (err.code !== "EEXIST") throw err;
    }
  });
};

module.exports = POST;
