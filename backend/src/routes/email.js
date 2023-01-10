const express = require('express')
const router = express.Router()

const mysql = require('mysql2')
const con = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'db'
})

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'your-smtp-server',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'user',
        pass: 'password'
    }
});

// middleware
router.use((req, res, next) => {
    console.log('Test')
    next()
})

router.use(express.json())

router.post('/generate', (req, res) => {
    con.connect(error => {
        if (error) throw error
        console.log('Connected!')

        con.query('SELECT * FROM student WHERE status = PENDING CONFIRMATION', (error, results) => {
            console.log(results)
            if (error) throw error

            // assign results to list
            const students = results
            students.forEach(student => {
                const subject = 'Internship Response to Internship Request'
                // get company student assigned to
                // const companyContact = 
                const year = new Date().getFullYear()
                
                // TODO: get internship period
                const internshipPeriod = '2022'

                // create message
                const message = `Dear ${companyContact}, \n\nKindly find attached our students resume for the ${year} semester Internship 
                in response to your job description which you have submmited to us. \n\nWe look forward to your favorable response and to
                working with your company for the upcoming internship period ${internshipPeriod}.`

                // send email
                const mailOptions = {
                    from: 'sender@gmail.com',
                    to: companyContact,
                    subject: subject,
                    text: message
                }
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(`Email sent to ${companyContact} for ${student.name}`, info.messageId)
                    }
                })
            })
        })
    })
})

module.exports = router