const express = require("express")
const app = express()
const port = 5222

app.get('/api/v1', (req, res) => {
    res.send('Hello World')
})

// router for students
const studentRouter = require("./routes/student")
app.use('/api/v1/students', studentRouter)

// router for companies
const companyRouter = require('./routes/companies')
app.use('/api/v1/companies', companyRouter)

//Running backend on port 5222
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})