const moment = require("moment");

const format = function(date){
    return moment(date, "YYYY-MM-DD").format("LLLL")
}
module.exports = { format }