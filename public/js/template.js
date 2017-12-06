function main() {
          var figures = document.getElementsByTagName("figure");
          var teller = 0;
          while (teller < figures.length) {
            figures[teller].innerHTML = "<span class='upper'>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span>" + "<span class='left'>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span>" +  figures[teller].innerHTML + "<span class='bottom'>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span><span class='right'>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span>";
            teller++;
          }
}

window.onload = function() {
       main();
}
var tijd = document.getElementById("tijd");
var uitklap = document.getElementById("uitklap");
var bevestigen = document.getElementById("bevestigen");
var vertrek = document.getElementById("vertrek");
var tijdstipinvullen = document.getElementById("uur");
var daginvullen = document.getElementById("dag");
var knopvandaag = document.getElementById("vandaag");
var knopmorgen = document.getElementById("morgen");
var knopkalender = document.getElementById("kalender");
var knopvertrek = document.getElementById("vertrekknop");
var knopaankomst = document.getElementById("aankomstknop");
var kalender = document.getElementById("datum");
var overlaydatum = document.getElementById('overlaydatum');
var overlaytijd = document.getElementById('overlaytijd');
var tijdinput = document.getElementById('tijdstip');
knopvertrek.onclick = function(){
  vertrek.innerHTML = "Vertrek";
  knopvertrek.className = "link2";
  knopaankomst.className = "link";
}
knopaankomst.onclick = function(){
  vertrek.innerHTML = "Aankomst";
  knopvertrek.className = "link";
  knopaankomst.className = "link2";
}
knopvandaag.onclick = function(){
  daginvullen.innerHTML = "Vandaag";
  knopvandaag.className = "link2";
  knopmorgen.className = "link";
  knopkalender.className = "link";
  kalender.className = "datum";
}
knopmorgen.onclick = function(){
  daginvullen.innerHTML = "Morgen";
  knopvandaag.className = "link";
  knopmorgen.className = "link2";
  knopkalender.className = "link";
  kalender.className = "datum";
}
knopkalender.onclick = function(){
  daginvullen.innerHTML = "Kalender";
  knopvandaag.className = "link";
  knopmorgen.className = "link";
  knopkalender.className = "link2";
  kalender.className = "datum2";
}
tijd.onclick = function tonen(){
  uitklap.className = "uitklap2";
  bevestigen.className ="bevestigen2";
}
kalender.onclick = function(){
overlaydatum.className = "overlaydatum2";
}
overlaydatum.onclick = function(){
overlaydatum.className = "overlaydatum";
}

tijdinput.onclick = function(){
overlaytijd.className = "overlaytijd2";
}

overlaytijd.onclick = function(){
overlaytijd.className = "overlaytijd";
}
bevestigen.onclick = function() {
  uitklap.className = "uitklap";
  bevestigen.className ="bevestigen";
   var uur = document.getElementById("tijdstip").value;
   tijdstipinvullen.innerHTML = uur;
};
