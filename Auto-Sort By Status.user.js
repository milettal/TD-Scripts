// ==UserScript==
// @name         Auto-Sort By Status
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Autosorts the SD - open tickets queue to by status
// @author       Luke Miletta
// @match        https://oregonstate.teamdynamix.com/TDNext/Home/Desktop*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

var id;

function items(){
    var boxes = document.getElementsByClassName("report-module");
    for (var i = 0; i < boxes.length; i++) {
        if((((boxes[i].childNodes)[0]).childNodes)[0].textContent == 'SD - open, unassigned (Incidents, Service Requests)'){
            id = boxes[i].id;
        }
    }
    boxes = document.getElementById(id);

    if(boxes.getElementsByClassName("sort-link")[4]){
        boxes = boxes.getElementsByClassName("sort-link")[4].childNodes[0];
        eventFire(boxes, 'click');
    }
    else{
        console.log("Waiting");
        window.setTimeout(items, 100);
    }
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
