var id_day = 0;
var id_match = 0;

/* SPL Matches */

var matches = 
    [
    [['PAPIS', 'RIV', ''], ['NRG', 'DIG', ''], ['AMS', 'EU', ''], ['LG', 'SS', '']], //SPL THURS
    [['BUR', 'DIG', ''], ['ELE', 'NRG', ''], ['PAPIS', 'VAC', ''], ['RIV', 'OBEY', '']], //SPL SAT
    [['SPL', 'SS', ''], ['ALG', 'LG', ''], ['AMS', 'NOB', ''], ['EU', 'TRI', '']], //SPL SUN
    ];

document.addEventListener("DOMContentLoaded", function(){
  var html = "";
  for (var i = 0; i < matches.length; i++) {
    html = html + "\t<div class = \"day-match\">\n";
    for (var j = 0; j < matches[i].length; j++) {
      html = html + "\t\t<div class=\"match\">\n";
      html = html + "\t\t\t<div class=\"team1 " + matches[i][j][0] + "\"></div>\n";
      html = html + "\t\t\t<div class=\"score\">0 : 0</div>\n";
      html = html + "\t\t\t<div class=\"team2 " + matches[i][j][1] + "\"></div>\n";
      html = html + "\t\t</div>\n";
    }
    html = html + "\t</div>\n";
    console.log(html);
  }
  $("#content").html(html);
  setDayMatch(id_day);
  setMatch(id_match);
  console.log("1: " + id_day);
  changeDetails(id_match, id_day, matches);
});

$(document).keydown(function (e) {
  var keyCode = e.keyCode || e.which;
  var arrow = {left: 37, up: 38, right: 39, down: 40 };
  console.log(keyCode);
  switch (keyCode) {
    case 37: //Left
      $(".onscreen .match").removeClass("current");
      $(".onscreen").css("top", "0");
      id_day = previousMatchDay(id_day);
      id_match = 0;
      setMatch(id_match);
      changeDetails(id_match, id_day, matches);
      break;
    case  38: //Up
      id_match = previousMatch(id_match, id_day);
      changeDetails(id_match, id_day, matches);
      break;
    case 39: //Right
      $(".onscreen .match").removeClass("current");
      $(".onscreen").css("top", "0");
      id_day = nextMatchDay(id_day);
      id_match = 0;
      setMatch(id_match);
      changeDetails(id_match, id_day, matches);
      break;
    case 40: //Down
      id_match = nextMatch(id_match, id_day);
      changeDetails(id_match, id_day, matches);
      break;
    case 49: //1
      document.querySelector(".current .score").innerText = "2 : 0";
      break;
    case 50: //2
      document.querySelector(".current .score").innerText = "1 : 1";
      break;
    case 51: //3
      document.querySelector(".current .score").innerText = "0 : 2";
      break;
    case 52: //4
      document.querySelector(".current .score").innerText = "0 : 0";
      break;
    case 53: //5
      document.querySelector(".current .score").innerText = "  -  ";
      break;
    case 54: //6
      document.querySelector(".current .score").innerText = "Win - Lose";
      break;
    case 55: //7
      document.querySelector(".current .score").innerText = "Lose - Win";
      break;
  }
  console.log("Match: "+id_match);
});

function setDayMatch(day) {
  $(".day-match").eq(day).addClass("onscreen");
}

function setMatch(match) {
  $(".onscreen .match").eq(match).addClass("current");
}

function nextMatchDay(id_day) {
  if (id_day != (matches.length-1)) {
    $(".day-match").eq(id_day).delay(375).removeClass("onscreen");
    id_day++;
    $(".day-match").eq(id_day).delay(375).addClass("onscreen");
    return id_day;
  }
  return id_day;
}

function previousMatchDay(id_day) {
  if(id_day != 0){
    $(".day-match").eq(id_day).delay(375).removeClass("onscreen");
    id_day--;
    $(".day-match").eq(id_day).delay(375).addClass("onscreen");
    return id_day;
  }
  return id_day;
}


function nextMatch(id_match, id_day) {
  // console.log(matches[id_day].length - 1);
  if (id_match != (matches[id_day].length-1)) {
    $(".onscreen .match").eq(id_match).removeClass("current");
    id_match++;
    $(".onscreen").animate({top: (id_match*(-130))}, 375);
    $(".onscreen .match").eq(id_match).addClass("current");
    return id_match;
  }
  return id_match;
}

function previousMatch(id_match, id_day) {
  if(id_match != 0){
    $(".onscreen .match").eq(id_match).removeClass("current");
    id_match--;
    $(".onscreen").animate({top: (id_match*(-130))}, 375);
    $(".onscreen .match").eq(id_match).addClass("current");
    return id_match;
  }
  return id_match;
}
var tempClass = ["",""]
function changeDetails(id_match, id_day, matches) {
  //var team1 =
  $(".teamdetails").animate({height: "0px"}, 375, function(){
    $(".team1_details").removeClass(tempClass[0]);
    $(".team2_details").removeClass(tempClass[1]);
    var team1Class = matches[id_day][id_match][0]+"Team";
    var team2Class = matches[id_day][id_match][1]+"Team";
    tempClass[0] = team1Class;
    tempClass[1] = team2Class;
    // console.log("Team1" + team1Class + "Team2" + team2Class);
    $(".team1_details").addClass(team1Class);
    $(".team2_details").addClass(team2Class);
  });
  $(".teamdetails").animate({height: "420px"}, 375);
}
