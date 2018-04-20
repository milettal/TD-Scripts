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

var unassignedQueue;

function execProcess() {
  var queues = document.querySelectorAll('[dragclass=DragDragBox]');
  queues.forEach(checkContent(element, "SD - open, unassigned (Incidents, Service Requests)"));
  console.log(unassignedQueue);
}

function checkContent(element, content) {
  if ((((element.childNodes)[0]).childNodes)[0].textContent == content) {
    unassigned = element.id;
  }
}
