// ==UserScript==
// @name         Auto-uncheck Notify Responsible and Requestor
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Auto-uncheck Notify Responsible
// @author       Luke Miletta
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New*
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/Edit*
// @grant        none
// ==/UserScript==

var checks = document.getElementsByClassName("checkbox");
for(var i = 0; i < checks.length; i++){
    if((checks[i].children)[0].innerText == "Notify Requestor" || (checks[i].children)[0].innerText == "Notify Responsible" || (checks[i].children)[0].innerText == "Notify on change"){
        (((checks[i].children)[0]).children)[0].click();
    }
}
