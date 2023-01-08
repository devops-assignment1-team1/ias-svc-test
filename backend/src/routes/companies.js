const express = require("express")
const router = express.Router()

// middleware
router.use((req, res, next) => {
    console.log('Test')
    next()
})

router.get('/', (req, res) => {
    res.send('Company List')
})

router.post('/upload', (req, res) => {
    res.send('Upload company data')
})

module.exports = router