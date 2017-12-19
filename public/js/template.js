window.onload = function() {
      setTimeout(intro, 4000);
       main();
}

function intro(){
  var vis = document.getElementsByClassName("vis")[0];
  console.log(vis);
  var invis = document.getElementsByClassName("invis")[0];

  vis.classList.add('invis');
  invis.classList.remove("invis");
}

function main() {
          var figures = document.getElementsByTagName("figure");
          var teller = 0;
          while (teller < figures.length) {
            figures[teller].innerHTML = "<span class='upper'>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span>" + "<span class='left'>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span>" +  figures[teller].innerHTML + "<span class='bottom'>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span><span class='right'>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span>";
            teller++;
          }
}


var tijd = document.getElementById("tijd");
var uitklap = document.getElementById("uitklap");
var bevestigen = document.getElementById("bevestigen");
var vertrek = document.getElementById("vertrek");
var tijdstipinvullen = document.getElementById("uur");
var overlaytijd = document.getElementById('overlaytijd');
var tijdinput = document.getElementById('tijdstip');
var select = document.getElementById("select");
var wanneer = document.getElementById("dag");

var dag = document.getElementById("daginvuller");
var maand = document.getElementById("maandinvuller");
var jaar = document.getElementById("jaarinvuller");


tijd.onclick = function tonen(){
  uitklap.className = "uitklap2";
  bevestigen.className ="bevestigen2";
}

tijdinput.onclick = function(){
overlaytijd.className = "overlaytijd2";
}

overlaytijd.onclick = function(){
overlaytijd.className = "overlaytijd";
}


bevestigen.onclick = function(){
  if (select.value === "1") {
    vertrek.innerHTML = "Vertrek";
  }else {
    vertrek.innerHTML = "Aankomst"
  }

  wanneer.innerHTML = dag.value + "/" + maand.value + "/" + jaar.value

  uitklap.className = "uitklap";
  bevestigen.className ="bevestigen";
   var uur = document.getElementById("tijdstip").value;
   tijdstipinvullen.innerHTML = uur;
}
