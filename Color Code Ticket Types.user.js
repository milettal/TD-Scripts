// ==UserScript==
// @name     Color Code Ticket Types
// @namespace  http://tampermonkey.net/
// @version   2.0
// @description Color code the tickets based on types in the queue
// @author    Tyler Farnham / Luke Miletta
// @match    https://oregonstate.teamdynamix.com/TDNext/Home/Desktop/*
// @grant    GM_getValue
// @grant    GM_setValue
// ==/UserScript==
var tdRunCount = GM_getValue("tdRunCount", 0);
if(tdRunCount == 0){
  GM_setValue("tdRunCount", 1);
  return;
}
else{
  window.setTimeout(items, 100);
  GM_setValue("tdRunCount", 0);
  return;
}
var open_box;
var button1;
var next_page;
function items(){
  GM_setValue("tdRunCount", 0);
  var maxReport;
  var currentReport;
  var maxReportNumTickets = 0;
  var currentReportNumTickets = 0;
  var currentTicketTable;
  var reports = document.getElementsByClassName("report-module");
  var whichReport = 0;
  for (var i = 0; i < reports.length; i++) { //Wait for all of the tickets in each report to load in, count them, and find the largest report.
    currentReportNumTickets = 0;
    currentReport = reports[i];
    if(currentReport.childNodes[1].childNodes[1]){
       if((currentReport).childNodes[1].childNodes[1].childNodes.length > 1){
        currentTicketTable = (currentReport).childNodes[1].childNodes[1].childNodes[3].childNodes;
        for(var j = 0; j < currentTicketTable.length; j++){ //Find the largest
          if(currentTicketTable[j].nodeName == "TR") {
            currentReportNumTickets++; //Count the tickets
          }
        }
        if(currentReportNumTickets > maxReportNumTickets){
          maxReportNumTickets = currentReportNumTickets;
          maxReport = currentReport;
          whichReport = i;
        }
       }
       else if(i == reports.length){
         window.setTimeout(items, 100);
         return;
       }
        else{continue;}
    }
    else{
      window.setTimeout(items, 100);
      return;
    }
  }
  var iii =(((maxReport.childNodes)[0]).childNodes)[1];
  // 1. Create the button
  button1 = document.createElement("i");
  button1.innerHTML = "Toggle Color";
  button1.setAttribute("class", "fa fa-lg gutter-left-xs");
  button1.setAttribute("title", "Toggle Color");
  button1.setAttribute("id", "toggle-button");
  button1.setAttribute("style", "border-style: solid; padding: 5px; border-width: 1px; border-radius: 5px;");
  // 2. Append somewhere
  iii.appendChild(button1);
  iii.insertBefore(button1, iii.firstChild);
  // 3. Add event handler
  button1.addEventListener ("click", click_form_button);
  // Function that handles click of form button
  function click_form_button(){
    var tickets = ((((((maxReport.childNodes)[1]).childNodes)[1]).childNodes)[3]);
    tickets = tickets.children;
    if(button1.getAttribute("style") == "border-style: solid; padding: 5px; border-width: 1px; border-radius: 5px;"){
      button1.setAttribute("style", "border-style: solid; padding: 5px; border-width: 1px; border-radius: 5px; background-color: #2b2b2b; color: #f5f5f5;");
      for(i = 0; i < tickets.length; i++){
        if(((tickets[i].children)[4].innerHTML) == "Open"){
          tickets[i].setAttribute("style", "background-color: #d4fce6;");
        }
        else if(((tickets[i].children)[4].innerHTML) == "In Process"){
          tickets[i].setAttribute("style", "background-color: #76a8f7;");
        }
        else if(((tickets[i].children)[4].innerHTML) == "New"){
          tickets[i].setAttribute("style", "background-color: #f25757;");
        }
        else if(((tickets[i].children)[4].innerHTML) == "Escalated - Internal"){
          tickets[i].setAttribute("style", "background-color: #e17efc;");
        }
      }
    }
    else{
      button1.setAttribute("style", "border-style: solid; padding: 5px; border-width: 1px; border-radius: 5px;");
      for(i = 0; i < tickets.length; i++){
        if(((tickets[i].children)[4].innerHTML) == "Open"){
          tickets[i].setAttribute("style", "");
        }
        else if(((tickets[i].children)[4].innerHTML) == "In Process"){
          tickets[i].setAttribute("style", "");
        }
        else if(((tickets[i].children)[4].innerHTML) == "New"){
          tickets[i].setAttribute("style", "");
        }
        else if(((tickets[i].children)[4].innerHTML) == "Escalated - Internal"){
          tickets[i].setAttribute("style", "");
        }
      }
    }
  }
  // Listens for click of next page buttons
  var next_page = document.getElementsByClassName("pager-link");
  for(i = 0; i < next_page.length; i++){
    next_page[i].addEventListener ("click", click_page_button);
  }
  //Listens for click of refresh button
  maxReport.childNodes[0].childNodes[1].childNodes[2].addEventListener("click", function(){window.setTimeout(waitUntilRefresh, 50)}, false);
  function waitUntilRefresh(){
    if(maxReport.childNodes[0].childNodes[1].childNodes[2].className != "fa fa-refresh fa-lg refresh-module-icon gutter-left-xs"){
      window.setTimeout(waitUntilRefresh, 100);
      return -1;
    }
    else{
      click_form_button;
      window.setTimeout(click_refresh_button(maxReport), 100);
      return 1;
    }
  }
}
  function click_refresh_button(maxReport){
    var next_page = document.getElementsByClassName("pager-link");
    for(i = 0; i < next_page.length; i++){
      next_page[i].addEventListener ("click", click_page_button);
    }
    var tickets = ((((((maxReport.childNodes)[1]).childNodes)[1]).childNodes)[3]);
    tickets = tickets.children;
    if(button1.getAttribute("style") === "border-style: solid; padding: 5px; border-width: 1px; border-radius: 5px;"){
      for(var i = 0; i < tickets.length; i++){
        if(((tickets[i].children)[4].innerHTML) == "Open"){
          tickets[i].setAttribute("style", "");
        }
        else if(((tickets[i].children)[4].innerHTML) == "In Process"){
          tickets[i].setAttribute("style", "");
        }
        else if(((tickets[i].children)[4].innerHTML) == "New"){
          tickets[i].setAttribute("style", "");
        }
        else if(((tickets[i].children)[4].innerHTML) == "Escalated - Internal"){
          tickets[i].setAttribute("style", "");
        }
      }
    }
    else{
      for(i = 0; i < tickets.length; i++){
        if(((tickets[i].children)[4].innerHTML) == "Open"){
          tickets[i].setAttribute("style", "background-color: #d4fce6;");
        }
        else if(((tickets[i].children)[4].innerHTML) == "In Process"){
          tickets[i].setAttribute("style", "background-color: #76a8f7;");
        }
        else if(((tickets[i].children)[4].innerHTML) == "New"){
          tickets[i].setAttribute("style", "background-color: #f25757;");
        }
        else if(((tickets[i].children)[4].innerHTML) == "Escalated - Internal"){
          tickets[i].setAttribute("style", "background-color: #e17efc;");
        }
      }
    }
  }
function click_page_button(){
  // Listens for click of next page buttons
  var maxReport;
  var currentReport;
  var maxReportNumTickets = 0;
  var currentReportNumTickets = 0;
  var currentTicketTable;
  var reports = document.getElementsByClassName("report-module");
  for (var i = 0; i < reports.length; i++) {
    currentReportNumTickets = 0;
    currentReport = reports[i];
    if((currentReport).childNodes[1].childNodes[1].childNodes[3]){
      currentTicketTable = (currentReport).childNodes[1].childNodes[1].childNodes[3].childNodes;
      for(var j = 0; j < currentTicketTable.length; j++){ //Find the largest
        if(currentTicketTable[j].nodeName == "TR") {
          currentReportNumTickets++; //Count the tickets
        }
      }
      if(currentReportNumTickets > maxReportNumTickets){
        maxReportNumTickets = currentReportNumTickets;
        maxReport = currentReport;
      }
    }
  }
  window.setTimeout(reee, 750);
  function reee(){
    var next_page = document.getElementsByClassName("pager-link");
    for(i = 0; i < next_page.length; i++){
      next_page[i].addEventListener ("click", click_page_button);
    }
    var tickets = ((((((maxReport.childNodes)[1]).childNodes)[1]).childNodes)[3]);
    tickets = tickets.children;
    if(button1.getAttribute("style") === "border-style: solid; padding: 5px; border-width: 1px; border-radius: 5px;"){
      for(var i = 0; i < tickets.length; i++){
        if(((tickets[i].children)[4].innerHTML) == "Open"){
          tickets[i].setAttribute("style", "");
        }
        else if(((tickets[i].children)[4].innerHTML) == "In Process"){
          tickets[i].setAttribute("style", "");
        }
        else if(((tickets[i].children)[4].innerHTML) == "New"){
          tickets[i].setAttribute("style", "");
        }
        else if(((tickets[i].children)[4].innerHTML) == "Escalated - Internal"){
          tickets[i].setAttribute("style", "");
        }
      }
    }
    else{
      for(i = 0; i < tickets.length; i++){
        if(((tickets[i].children)[4].innerHTML) == "Open"){
          tickets[i].setAttribute("style", "background-color: #d4fce6;");
        }
        else if(((tickets[i].children)[4].innerHTML) == "In Process"){
          tickets[i].setAttribute("style", "background-color: #76a8f7;");
        }
        else if(((tickets[i].children)[4].innerHTML) == "New"){
          tickets[i].setAttribute("style", "background-color: #f25757;");
        }
        else if(((tickets[i].children)[4].innerHTML) == "Escalated - Internal"){
          tickets[i].setAttribute("style", "background-color: #e17efc;");
        }
      }
    }
  }
}
