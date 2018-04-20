// ==UserScript==
// @name         Color-Code Tickets Toggle
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Allows one to toggle color-coding of tickets based on ticket type
// @author       Taylor Griffin
// @match        https://oregonstate.teamdynamix.com/TDNext/Home/Desktop/Default.aspx*
// @grant        none
// ==/UserScript==

window.setTimeout(execProcess, 5000);

function execProcess() {
  var unassignedQueue = document.getElementById("2886414");
  var assignedToMe = document.getElementById("2886418");
  console.log(unassignedQueue);
  console.log(assignedToMe);
}
