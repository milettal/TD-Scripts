// ==UserScript==
// @name         Number of Items at the Top
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Grabs the number of items in the queue and pastes it in the top
// @author       Luke Miletta / Tyler Farnham
// @match        https://oregonstate.teamdynamix.com/TDNext/Home/Desktop/*
// @grant        none
// ==/UserScript==

window.setTimeout(items, 1500);

function items(){
    var ticketTable = document.getElementsByClassName("ModuleContent")[1].childNodes[1].childNodes[3].childNodes;
    var numTickets = 0;
    for(var i = 0; i < ticketTable.length; i++){
        if(ticketTable[i].nodeName == "TR") {
            numTickets++;
        }
    }

    var numTicketsText = "<br>" + numTickets + " tickets in the Queue";
    var htmlString = '<div style="Font-Size: 40px; text-align:center;">' + numTicketsText + '</div>';
    var divv = document.createElement('div');
    divv.innerHTML = htmlString;
    var topp = document.getElementById('divContent');
    topp.style.padding = "0px";
    topp.parentNode.insertBefore(divv, topp);
}
