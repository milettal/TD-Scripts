// ==UserScript==
// @name         Change Generic to Include Ticket Number
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Changes the Generic Field to Include the Ticket Number in the response
// @author       Luke Miletta
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/Update?TicketID=*
// @grant        none
// ==/UserScript==

function grab_id() {
    'use strict';
    var URL = window.location.href;
    var id = URL.split("TicketID=").pop();
    return id;
}

var full = "\n\nIf you need any assistance, give us a call and reference ticket number " + grab_id() + ". Thanks!";

var c = document.getElementsByClassName("js-template");
var d;
for(var i = 0; i < c.length; i++){
    if((c[i].innerHTML).includes("Generic"))
       d = c[i];
}

d.setAttribute("data-template", "Hi {{RequestorFirstName}},\n\n" + full + "\n\n{{TechnicianFullName}}\nIS Service Desk\nOregon State University\n\nTo respond, reply to this email or call 541-737-8787.");
