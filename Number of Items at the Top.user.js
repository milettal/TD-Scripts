// ==UserScript==
// @name         Number of Items at the Top
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Grabs the number of items in the queue and pastes it in the top
// @author       Luke Miletta / Tyler Farnham
// @match        https://oregonstate.teamdynamix.com/TDNext/Home/Desktop/*
// @grant        none
// ==/UserScript==

window.setTimeout(items, 1500);
var iii;

function items(){

    var boxes = document.getElementsByClassName("report-module");

    for (var i = 0; i < boxes.length; i++) {
        if((((boxes[i].childNodes)[0]).childNodes)[0].textContent == 'SD - open, unassigned (Incidents, Service Requests)'){ //Get the ID of the ticket report window
            iii = boxes[i].id;
        }
    }
    var ticketTable = (document.getElementsByClassName("ModuleContent")[1].childNodes[1].childNodes[3].childNodes); //Get the list of all of the tickets

    var numTickets = 0;
    for(i = 0; i < ticketTable.length; i++){
        if(ticketTable[i].nodeName == "TR") {
            numTickets++; //Count the tickets
        }
    }

    var numTicketsText = "<br>" + numTickets + " Tickets in the Queue";


    if(numTickets == 50 && (((((document.getElementById(iii).childNodes)[1]).childNodes)[3]).childNodes)[3].textContent.length > 0){ //Decide whether to use the TD ticket counter or our ticket counter
        var numitems = (((((document.getElementById(iii).childNodes)[1]).childNodes)[3]).childNodes)[3].textContent;
        numTicketsText = "<br>" + numitems + " in the Queue";
    }

    var htmlString = '<div style="Font-Size: 40px; text-align:center;">' + numTicketsText + '</div>';
    var divv = document.createElement('div');
    divv.innerHTML = htmlString;
    var topp = document.getElementById('divContent');
    topp.style.padding = "0px";
    topp.parentNode.insertBefore(divv, topp);
}
