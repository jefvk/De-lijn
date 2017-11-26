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
var tijdstipinvullen = document.getElementById("uur")
var daginvullen = document.getElementById("dag")
tijd.onclick = function tonen(){
  uitklap.className = "uitklap2";
  bevestigen.className ="bevestigen2";
}


bevestigen.onclick = function() {
  uitklap.className = "uitklap";
  bevestigen.className ="bevestigen";
  var vertrekaankomst = document.getElementsByName('vertrekaankomst');
  var val= "";
  for (var i = 0, length = vertrekaankomst.length; i < length; i++) {
      if (vertrekaankomst[i].checked) {
         val = vertrekaankomst[i].value;
         break;
       }
  }

  if (val == "vertrek" ) {
    vertrek.innerHTML = "Vertrek";
  } else {
    vertrek.innerHTML ="Aankomst";
  }
  var tijdstip = document.getElementById("tijdstip").value;
  tijdstipinvullen.innerHTML = tijdstip;

  var dag = document.getElementsByName('vertrekaankomst');
  var val= "";
  for (var i = 0, length = vertrekaankomst.length; i < length; i++) {
      if (vertrekaankomst[i].checked) {
         val = vertrekaankomst[i].value;
         break;
       }
  }

  if (val == "vertrek" ) {
    vertrek.innerHTML = "Vertrek";
  } else {
    vertrek.innerHTML ="Aankomst";
  }
};
