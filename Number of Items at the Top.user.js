// ==UserScript==
// @name         Number of Items at the Top
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Grabs the number of items in the queue and pastes it in the top
// @author       Luke Miletta
// @match        https://oregonstate.teamdynamix.com/TDNext/Home/Desktop/*
// @grant        none
// ==/UserScript==

window.setTimeout(items, 1500);
var iii;

function items(){
    //var boxes = document.querySelectorAll('[dragclass=DragDragBox]');
    var boxes = document.getElementsByClassName("report-module");
    console.log(boxes);
    /*boxes.forEach(function(element){
        if((((element.childNodes)[0]).childNodes)[0].textContent == 'SD - open, unassigned (Incidents, Service Requests)'){
            iii = element.id;
        }
    });*/
    for (var i = 0; i < boxes.length; i++) {
        if((((boxes[i].childNodes)[0]).childNodes)[0].textContent == 'SD - open, unassigned (Incidents, Service Requests)'){
            iii = boxes[i].id;
        }
    }
    var numitems = (((((document.getElementById(iii).childNodes)[1]).childNodes)[3]).childNodes)[3].textContent;
    numitems = "<br>" + numitems + "in the Queue";
    var htmlString = '<div style="Font-Size: 40px; text-align:center;">' + numitems + '</div>';
    var divv = document.createElement('div');
    divv.innerHTML = htmlString;
    var topp = document.getElementById('divContent');
    topp.style.padding = "0px";
    topp.parentNode.insertBefore(divv, topp);
}
