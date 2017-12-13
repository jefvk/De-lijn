var express = require("express");
var path = require("path");
var app = express();
var request = require("request");
var bodyParser = require('body-parser');

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'))
app.get('/', function(req,response){
  response.render("index", {});
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var xVan = "";
var yVan = "";
var xNaar = "";
var yNaar = "";

var startTijd;
var startHalte;

var eindTijd;
var eindHalte;
app.post('/', function(req, response){

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
             console.log("coordinaten van oke");
             console.log(xVan);
             console.log(yVan);


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
                     console.log("coordinaten naar oke");
                     console.log(xNaar);
                     console.log(yNaar);

                     console.log(req.body.Van);
                     console.log(req.body.Naar);
                     console.log(yVan);
                     console.log(xVan);
                     var finalUrl = 'https://www.delijn.be/rise-api-core/reisadvies/routes/'+ req.body.Van + '/' +req.body.Naar +'/'+xVan+'/'+yVan+'/'+xNaar+'/'+yNaar+'/20-12-2017/08:00/1/on/of/of/of/of/nl';
                     request.get({url:finalUrl, json:true}, (err,res,data)=>{
                       if (err) {
                         console.log(err);
                       }else if (res.statusCode === 200){
                         console.log(data.reiswegen[0].reiswegStappen[1]);
                         startTijd = data.reiswegen[0].reiswegStappen[1].start;
                         startHalte = data.reiswegen[0].reiswegStappen[1].startLocatie;

                         eindTijd = data.reiswegen[0].reiswegStappen[1].end;
                         eindHalte = data.reiswegen[0].reiswegStappen[1].aankomstLocatie;
                         response.render("resultaten", {
                           "startTijd": startTijd,
                           "startHalte": startHalte,
                           "eindTijd": eindTijd,
                           "eindHalte": eindHalte
                         });
                           }
                         });
                   }
                 })
               }
          })
        }
      })
    };
    });
    });





app.listen(app.get('port'), function() {
  console.log('Node luistert op poort', app.get('port'));
});
