// const data = require('./expenses.json')
// // const Expense = require('./server/models/Expense')
// const mongoose = require('mongoose')
// mongoose.connect("mongodb://127.0.0.1:27017/expensesDB", {
//   useNewUrlParser: true,
// }).catch((err)=> console.log(err))
// const Schema = mongoose.Schema

// const expenseSchema = new Schema({
//     item: String,
//     amount: Number,
//     date: Date,
//     group: String
// })

// const Expense = mongoose.model("Expense", expenseSchema )

// for(let d of data){
//     let e1 = new Expense(d)
//     e1.save()
// }

