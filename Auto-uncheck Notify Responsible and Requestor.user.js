// ==UserScript==
// @name         Auto-uncheck Notify Responsible and Requestor
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto-uncheck Notify Responsible
// @author       Luke Miletta
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New*
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/Edit*
// @grant        none
// ==/UserScript==

var checks = document.getElementsByClassName("checkbox");
for(var i = 0; i < checks.length; i++){
    (((checks[i].children)[0]).children)[0].click();
}
