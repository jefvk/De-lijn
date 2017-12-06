var express = require("express");
var path = require("path");
var app = express();
var request = require("request");
var bodyParser = require('body-parser');
var request = require("request");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var xVan = "";
var yVan = "";
var xNaar = "";
var yNaar = "";

var duration = "";

app.post('/', function(req, res){
    var getAddressVan = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ req.body.Van +'&key=AIzaSyDMtUsmbGsJnu_99XdMzB3b5h_XPPMEmf4';
    request.get({url:getAddressVan, json:true}, (err,res,data)=>{
      if (err) {
        console.log(err);
      }else if (res.statusCode === 200){
        var getCoorVan= 'https://www.delijn.be/rise-api-core/coordinaten/convert/' +data.results[0].geometry.location.lat+'/' + data.results[0].geometry.location.lng;
        request.get({url:getCoorVan, json:true}, (err,res,data)=>{
          if (err) {
            console.log(err);
          }else if (res.statusCode === 200){
             xVan = data.xCoordinaat;
             yVan = data.yCoordinaat;
          }
        })
      }
    });

    var getAddressNaar = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ req.body.Naar +'&key=AIzaSyDMtUsmbGsJnu_99XdMzB3b5h_XPPMEmf4';
    request.get({url:getAddressNaar, json:true}, (err,res,data)=>{
      if (err) {
        console.log(err);
      }else if (res.statusCode === 200){
        var getCoorNaar= 'https://www.delijn.be/rise-api-core/coordinaten/convert/' +data.results[0].geometry.location.lat+'/' + data.results[0].geometry.location.lng;
        request.get({url:getCoorNaar, json:true}, (err,res,data)=>{
          if (err) {
            console.log(err);
          }else if (res.statusCode === 200){
            xNaar = data.xCoordinaat;
            yNaar = data.yCoordinaat;
          }
        })
      }
    });


    var finalUrl = 'https://www.delijn.be/rise-api-core/reisadvies/routes/'+ req.body.Van + '/' +req.body.Naar +'/'+xVan+'/'+yVan+'/'+xNaar+'/'+yNaar+'/07-12-2017/20:00/1/on/on/on/on/of/nl';
    request.get({url:finalUrl, json:true}, (err,res,data)=>{
      if (err) {
        console.log(err);
      }else if (res.statusCode === 200){
          console.log(data);

          duration = data.duration[0];
          }
        });

    console.log(duration);
    });




app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'))
app.get('/', function(req,res){
  res.render("index", {});
});
app.listen(app.get('port'), function() {
  console.log('Node luistert op poort', app.get('port'));
});
