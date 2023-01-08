const express = require("express")
const app = express()

app.get('/api/v1')

const studentRouter = require("./routes/student")

app.use('/students', studentRouter)

app.listen(5222)