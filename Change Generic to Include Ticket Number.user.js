// ==UserScript==
// @name         Change Generic to Include Ticket Number
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Changes the Generic Field to Include the Ticket Number in the response
// @author       Luke Miletta
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/Update?TicketID=*
// @grant        none
// ==/UserScript==

function grab_id() {
    'use strict';
    var URL = window.location.href;
    var id = URL.split("TicketID=").pop();
    console.log(id);
    return id;
}

var full = "\n\nIf you need any assistance, give us a call and reference ticket number " + grab_id() + ". Thanks!";

var comment = document.getElementById("Comments");

var blah = document.getElementsByClassName("dropdown-menu multi-level");
var blah = blah[0].childNodes;
var blah1 = blah[11].childNodes;
var blah2 = blah1[3].childNodes;
var blah3 = blah2[9].childNodes;
var blah3 = blah3[1];
blah3.setAttribute("data-template", "Hi {{RequestorFirstName}},\n\n" + full + "\n\n{{TechnicianFullName}}\nIS Service Desk\nOregon State University\n\nTo respond, reply to this email or call 541-737-8787.");
