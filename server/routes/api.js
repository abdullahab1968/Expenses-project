const express = require('express')
const router = express.Router()

const Expense = require('../models/Expense')
const moment = require('moment');

router.get('/expenses', function (req, res) {
   Expense.find({}).sort({date: -1}).then(function(expenses){
    res.send(expenses)
   })
})

router.post('/expense', function(req, res){
      const item = req.query.item
      const amount = req.query.amount
      const group = req.query.group
      const date = req.query.date ? moment(req.query.date, "YYYY-MM-DD").format('LLLL') : moment().format('LLLL')
      const expense = new Expense({
         amount: amount,
         group: group,
         date: date,
         item: item
      })
      expense.save().then(function(){
         console.log(`The amount of the expense is ${amount} is spent on ${item}`)
         res.end()
      })
})

module.exports = router