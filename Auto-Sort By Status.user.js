// ==UserScript==
// @name         Auto-Sort By Status
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Autosorts the SD - open tickets queue to by status
// @author       Luke Miletta
// @match        https://oregonstate.teamdynamix.com/TDNext/Home/Desktop*
// @grant        none
// ==/UserScript==

window.setTimeout(items, 1500);
var id;

function items(){
    var boxes = document.getElementsByClassName("report-module");
    for (var i = 0; i < boxes.length; i++) {
        if((((boxes[i].childNodes)[0]).childNodes)[0].textContent == 'SD - open, unassigned (Incidents, Service Requests)'){
            id = boxes[i].id;
        }
    }
   boxes = document.getElementById(id);
   boxes = (((((((((boxes.childNodes)[1]).childNodes)[1]).childNodes)[1]).childNodes)[1]).childNodes);
   for (i = 0; i < boxes.length; i++){
       if(boxes[i].innerText === "Status"){
           boxes = boxes[i];
           break;
       }
   }
   boxes = (boxes.childNodes)[0];
   eventFire(boxes, 'click');
}

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
