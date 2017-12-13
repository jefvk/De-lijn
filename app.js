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
var lijnNummer;
var eindTijd;
var eindHalte;

var startTijd2;
var startHalte2;
var lijnNummer2;
var eindTijd2;
var eindHalte2;

var startTijd3;
var startHalte3;
var lijnNummer3;
var eindTijd3;
var eindHalte3;

var startTijd4;
var startHalte4;
var lijnNummer4;
var eindTijd4;
var eindHalte4;

var startTijd5;
var startHalte5;
var lijnNummer5;
var eindTijd5;
var eindHalte5;
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
                         startTijd = data.reiswegen[0].reiswegStappen[1].start;
                         startHalte = data.reiswegen[0].reiswegStappen[1].startLocatie;
                         lijnNummer = data.reiswegen[0].reiswegStappen[1].lijn.lijnNummerPubliek;
                         eindTijd = data.reiswegen[0].reiswegStappen[1].end;
                         eindHalte = data.reiswegen[0].reiswegStappen[1].aankomstLocatie;

                         startTijd2 = data.reiswegen[1].reiswegStappen[1].start;
                         startHalte2 = data.reiswegen[1].reiswegStappen[1].startLocatie;
                         lijnNummer2 = data.reiswegen[1].reiswegStappen[1].lijn.lijnNummerPubliek;
                         eindTijd2 = data.reiswegen[1].reiswegStappen[1].end;
                         eindHalte2 = data.reiswegen[1].reiswegStappen[1].aankomstLocatie;

                         startTijd3 = data.reiswegen[2].reiswegStappen[1].start;
                         startHalte3 = data.reiswegen[2].reiswegStappen[1].startLocatie;
                         lijnNummer3 = data.reiswegen[2].reiswegStappen[1].lijn.lijnNummerPubliek;
                         eindTijd3 = data.reiswegen[2].reiswegStappen[1].end;
                         eindHalte3 = data.reiswegen[2].reiswegStappen[1].aankomstLocatie;

                      /*   startTijd4 = data.reiswegen[3].reiswegStappen[1].start;
                         startHalte4 = data.reiswegen[3].reiswegStappen[1].startLocatie;
                         lijnNummer4 = data.reiswegen[3].reiswegStappen[1].lijn.lijnNummerPubliek;
                         eindTijd4 = data.reiswegen[3].reiswegStappen[1].end;
                         eindHalte4 = data.reiswegen[3].reiswegStappen[1].aankomstLocatie;

                         startTijd5 = data.reiswegen[4].reiswegStappen[1].start;
                         startHalte5 = data.reiswegen[4].reiswegStappen[1].startLocatie;
                         lijnNummer5 = data.reiswegen[4].reiswegStappen[1].lijn.lijnNummerPubliek;
                         eindTijd5 = data.reiswegen[4].reiswegStappen[1].end;
                         eindHalte5 = data.reiswegen[4].reiswegStappen[1].aankomstLocatie;*/

                         response.render("resultaten", {
                           "startTijd": startTijd,
                           "startHalte": startHalte,
                           "lijnNummer": lijnNummer,
                           "eindTijd": eindTijd,
                           "eindHalte": eindHalte,

                           "startTijd2": startTijd2,
                           "startHalte2": startHalte2,
                           "lijnNummer2": lijnNummer2,
                           "eindTijd2": eindTijd2,
                           "eindHalte2": eindHalte2,

                          "startTijd3": startTijd3,
                           "startHalte3": startHalte3,
                           "lijnNummer3": lijnNummer3,
                           "eindTijd3": eindTijd3,
                           "eindHalte3": eindHalte3,

                          /* "startTijd4": startTijd4,
                           "startHalte4": startHalte4,
                           "lijnNummer4": lijnNummer4,
                           "eindTijd4": eindTijd4,
                           "eindHalte4": eindHalte4,

                           "startTijd5": startTijd5,
                           "startHalte5": startHalte5,
                           "lijnNummer5": lijnNummer5,
                           "eindTijd5": eindTijd5,
                           "eindHalte5": eindHalte5,*/



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
