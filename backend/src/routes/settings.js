const express = require("express")
const router = express.Router()

// middleware
router.use((req, res, next) => {
    console.log('Test')
    next()
})

router.get('/', (req, res) => {
    res.send('Settings')
})

module.exports = router
