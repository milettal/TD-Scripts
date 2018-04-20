// ==UserScript==
// @name         Color-Code Tickets Toggle
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Allows one to toggle color-coding of tickets based on ticket type
// @author       Taylor Griffin
// @match        https://oregonstate.teamdynamix.com/TDNext/Home/Desktop/Default.aspx*
// @grant        none
// ==/UserScript==

window.setTimeout(execProcess, 1000);

function execProcess() {
  var queue = document.getElementById("2886416");
  console.log(queue);
  //document.getelementsByClassName("");
}
