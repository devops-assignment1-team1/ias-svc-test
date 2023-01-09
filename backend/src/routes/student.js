const express = require("express")
const router = express.Router()

router.use((req, res, next) => {
    console.log('Test')
    next()
})

router.get("/",(req,res) => {
    res.send("student")
})
    
module.exports = router