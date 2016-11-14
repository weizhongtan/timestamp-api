var express = require("express")
var app = express();

app.use("/timestamp", express.static("public"))

app.get("/timestamp/:date", function(req, res) {
  var date = req.params.date;
  if (date.match(/^[0-9]+$/) !== null) {
    var resDate = new Date(Number(date)*1000);
  } else if (!Number.isNaN(Date.parse(date))) {
    var resDate = new Date(date)
  } else {
    var resDate = undefined
  }
  
  console.log("Valid Date?", (!Number.isNaN(Date.parse(date))));
  
  var response = {
    unix: (resDate === undefined) ? null : resDate.getTime()/1000,
    natural: (resDate === undefined) ? null : convertMonth(resDate.getMonth()) + " " + resDate.getDate() + ", " + resDate.getFullYear()
  }
  
  function convertMonth(monthNum) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months[monthNum]
  }
  res.end(JSON.stringify(response))
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
})