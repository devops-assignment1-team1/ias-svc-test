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

const getCompanyContact = async (associatedCompany) => {
    try {
        const results = await con.query('SELECT company_contact FROM company WHERE company_id = ?', [associatedCompany])

        // if company is queried
        if (results && results.length > 0 && results[0].hasOwnProperty('company_contact')) {
            // return company_contact of company
            const companyContact = results[0].company_contact
            return companyContact
        }
        else {
            return null
        }

    } catch(err) {
        throw err
    }
}

const getInternshipPeriod = async () => {
    try {
        const results = await con.query('SELECT setting_value FROM system_settings WHERE setting_type = INTERNSHIP_PERIOD')

        // if value is not null
        if (results && results.length > 0 && results[0].hasOwnProperty('setting_type')) {
            // return company_contact of company
            const internshipPeriod = results[0].setting_value
            return internshipPeriod
        }
        else {
            return null
        }

    } catch(err) {
        throw err
    }
}

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

        // for students with pending confirmation
        con.query('SELECT * FROM student WHERE status = PENDING CONFIRMATION', (error, results) => {
            console.log(results)
            if (error) throw error

            // assign results to list
            const students = results
            students.forEach(student => {
                const subject = 'Internship Response to Internship Request'

                // get company contact of company student assigned to
                const companyContact = getCompanyContact(student.company_id)

                // get current year
                const year = new Date().getFullYear()
                
                // get internship period
                const internshipPeriod = getInternshipPeriod()

                // create message
                const message = `Dear ${companyContact}, \n\nKindly find attached our students resume for the ${year} semester Internship 
                in response to your job description which you have submmited to us. \n\nWe look forward to your favorable response and to
                working with your company for the upcoming internship period ${internshipPeriod}.`

                // TODO: attaching resume
                
                // TODO: message to file directory 

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