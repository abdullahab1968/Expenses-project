const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense");
const moment = require("moment");
const dateUtilities = require('../utiles/date-utiles')

router.get("/expenses", function (req, res) {
  let date1 = req.query.d1;
  let date2 = req.query.d2;
  if (date1) {
    date1 = dateUtilities.format(date1)   //code duplication
    date2 = date2 ? dateUtilities.format(date2) : new Date()
   
    Expense.find({ date: { $lte: date2, $gte: date1 } })
                                                      .then((expenses) =>
                                                       res.send(expenses)
                                                      ).catch(err => res.status(400).send("Somthing is going wrong"))
    
   return;
  } 
  else {
    Expense.find({})
      .sort({ date: -1 })
      .then(function (expenses) {
        res.send(expenses);
      })
      .catch(err => res.status(400).send("Somthing is going wrong")) // in send prefer to send JSON with status code
      return;
  }
});

router.post("/expense", function (req, res) {
  const item = req.query.item;
  const amount = req.query.amount;
  const group = req.query.group;
  const date = req.query.date? dateUtilities.format(req.query.date) : new Date()

  const expense = new Expense({
    amount: amount,
    group: group,
    date: date,
    item: item,
  });
  expense.save()
               .then(function () {
                           console.log(`The amount of the expense is ${amount} is spent on ${item}`);
               res.end();
  })
  .catch(err => res.status(400).send("Somthing is going wrong"))
});

router.put("/update", function (req, res) {
  const group1 = req.query.g1;
  const group2 = req.query.g2;
  Expense.updateOne(
                     {group: group1},
                     {$set: {group: group2}}
                     ,function(err , expense){
                     res.send(expense)
                  })

});

router.get("/expenses/:group", function (req, res) {
  const groupParam = req.params.group;
  const total = req.query.total;
  if (total === "true") {
    Expense.aggregate([
      { $match: { group: groupParam } },
      { $group: { _id: groupParam, total: { $sum: "$amount" } } },
    ]).then((result) => {
      res.send(result);
      return;
    });
  } else {
         Expense.find({ group: groupParam }).then((r) => res.send(r));
  }
});
module.exports = router;
