var express = require("express");
var path = require("path");
var app = express();
var request = require("request");
var bodyParser = require('body-parser');
var getAddress = "https://maps.googleapis.com/maps/api/geocode/json?address=Wiekevorst&key=AIzaSyDMtUsmbGsJnu_99XdMzB3b5h_XPPMEmf4";
request.get({url:getAddress, json:true}, (err,res,data)=>{
  if (err) {
    console.log(err);
  }else if (res.statusCode === 200){
    console.log(data.results[0].geometry.location)
  }
})

var getCoor= "https://www.delijn.be/rise-api-core/coordinaten/convert/51.10914/4.79449149999";
request.get({url:getCoor, json:true}, (err,res,data)=>{
  if (err) {
    console.log(err);
  }else if (res.statusCode === 200){
    console.log(data.xCoordinaat);
    console.log(data.yCoordinaat);
  }
})

var url = "https://www.delijn.be/rise-api-core/haltes/indebuurt/179815/199980/300";
request.get({url:url, json:true}, (err,res,data)=>{
  if (err) {
    console.log(err);
  }else if (res.statusCode === 200){
    console.log(data[0].afstand);
    console.log(data[1].afstand);
    console.log(data[2].afstand);
    console.log(data[3].afstand)
  }
})

app.set('nieuwsFile', require('./config/nieuws.json'));
app.set('categorieenFile', require('./config/categorieen.json'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/', function(request, response){
    console.log(request.body.tijdstip);
    console.log(request.body.Van);
    console.log(request.body.Naar);
});

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'))

app.use(require("./routes/root_router"));
app.use(require("./routes/nieuws_router"));
app.use(require("./routes/categorieen_router"));

app.listen(app.get('port'), function() {
  console.log('Node luistert op poort', app.get('port'));
});
