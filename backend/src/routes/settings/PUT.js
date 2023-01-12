const con = require("../../db");
const returnSuccess = require("../../utils");
const returnError = require("../../utils");
const express = require("express");
const router = express.Router();

const PUT = router.post('/', (req, res) => {
    console.log("/settings (PUT)");
    con.connect(error => {
        if (error) throw error;

        const body = req.body;
        if (body.email_dir === undefined) return returnError(res, ["email_dir"]);
        if (body.resume_dir === undefined) return returnError(res, ["resume_dir"]);
        if (body.internship_period === undefined) return returnError(res, ["internship_period"]);

        con.query(
            ` 
            UPDATE system_settings
            SET setting_value = CASE setting_type
                                    WHEN "RESUME_DIRECTORY" THEN ?
                                    WHEN "EMAIL_DIRECTORY" THEN ?
                                    WHEN "INTERNSHIP_PERIOD" THEN ?
                                END
            WHERE setting_type IN("RESUME_DIRECTORY", "EMAIL_DIRECTORY", "INTERNSHIP_PERIOD");
            `,
            [body.resume_dir, body.email_dir, body.internship_period],
            function(error, results, fields){
                if (error) throw error;
                returnSuccess(res, { "result": "success" });
            }
        );
    })
})

module.exports = PUT;
