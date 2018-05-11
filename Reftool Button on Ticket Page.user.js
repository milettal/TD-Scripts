// ==UserScript==
// @name         Reftool Button on Ticket Page
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a Reftool button next to a person's name in TD
// @author       Luke Miletta
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/TicketDet.aspx?TicketID=*
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/TicketDet?TicketID=*
// @grant        none
// ==/UserScript==

var box = document.getElementById("pcRequestor_divPersonInfo");
var name = (((((((box.childNodes)[1]).childNodes)[1]).childNodes)[3]).childNodes)[1];
name = name.textContent;
name = name.trim();
var firstName = name.split(' ').slice(0, -1).join(' ');
var lastName = name.split(' ').slice(-1).join(' ');

// 1. Create the button
var button1 = document.createElement("form-button");
button1.setAttribute("type", "button");
button1.innerHTML = "User in Reftool";
button1.setAttribute("class", "btn btn-primary btn-sm js-progress-button");
button1.setAttribute("id", "form-button");

// 2. Append somewhere
((box.childNodes)[1]).appendChild(button1);

// 3. Add event handler
button1.addEventListener ("click", click_reftool_button);

// Function that handles click of form button
function click_reftool_button(){
    var url = "https://tools.is.oregonstate.edu/reftool2/search/" + firstName + "\%2520" + lastName + ";searchType=people;filterType=all";
    window.open(url, '_blank');
}
