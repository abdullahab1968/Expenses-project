const express = require('express')
const router = express.Router()

const Expense = require('../models/Expense')

router.get('/expenses', function (req, res) {
   Expense.find({}).sort({date: -1}).then(function(expenses){
    res.send(expenses)
   })
})

module.exports = router