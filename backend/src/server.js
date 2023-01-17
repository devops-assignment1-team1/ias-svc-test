const cors = require('cors');
const express = require("express");
const bp = require('body-parser');

const app = express();
app.use(bp.json());
app.use(cors());

const port = 5222

app.get('/api/v1', (req, res) => {
    res.send('Hello World');
})

// router for students
const studentRouter = require("./routes/student/GET")
app.use('/api/v1/students', studentRouter)

const upsertStudentsRouter = require('./routes/company/POST');
app.use('/api/v1/students/upload', upsertStudentsRouter);

// router for companies
const companyRouter = require('./routes/company/GET')
app.use('/api/v1/companies', companyRouter)

const upsertCompaniesRouter = require('./routes/company/POST');
app.use('/api/v1/companies/upload', upsertCompaniesRouter);

// router for email
const emailRouter = require('./routes/email')
app.use('/api/v1/email', emailRouter)

// router for settings
const settingsRouter = require('./routes/settings/GET');
app.use('/api/v1/settings', settingsRouter);

const upsertSettingsRouter = require('./routes/settings/PUT');
app.use('/api/v1/settings', upsertSettingsRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})