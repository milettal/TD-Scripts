// ==UserScript==
// @name         Move Status to Top
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto-uncheck Notify Responsible
// @author       Tyler Farnham
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New*
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/Edit*
// @grant        none
// ==/UserScript==

var StatusInput = document.getElementById("attribute1306-grp");

var topElement = document.getElementById("divContent").childNodes[7].childNodes[6];

topElement.parentNode.insertBefore(StatusInput, topElement);