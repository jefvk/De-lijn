var express = require("express");
var path = require("path");
var app = express();
var request = require("request");
var bodyParser = require('body-parser');
var url = 'https://www.delijn.be/rise-api-core/haltes/indebuurt/103787/194286/300';
request.get({url:url, json: true}, (err,res,data)=>{
  if (err) {
    console.log(err);
  } else if (res.statusCode === 200){
    console.log(data[0].bestemmingen);
  }
});
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
