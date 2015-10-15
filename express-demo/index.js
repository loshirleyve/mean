var express = require("express");
var app = express();

app.get("/",function(req,res){
    res.send("你好！我是express!");
})

app.get("/order/:id/:name",function(req,res){
    res.send("你查询的订单号为："+req.params.id+",购买人："+req.params.name);
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
