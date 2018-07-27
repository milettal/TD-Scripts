// ==UserScript==
 // @name         Number of Items at the Top
 // @namespace    http://tampermonkey.net/
 // @version      1.4
 // @description  Grabs the number of items in the queue and pastes it in the top. Note: It gets the number of tickets from the largest report
 // @             that you have on your desktop, so if you have multiple similarly sized reports than it will grab the largest one. Additionally,
 // @             if you have multiple reports over 50 tickets, then it will grab the number of tickets from the one that is closest to the top of your screen.
 // @
 // @             Another note: If you see weird characters showing up in place of your TD buttons then you need to clear your browser cache.
 // @
 // @author       Tyler Farnham / Luke Miletta
 // @match        https://oregonstate.teamdynamix.com/TDNext/Home/Desktop/*
 // @grant        none
 // ==/UserScript==

 window.setTimeout(items, 1500);
 var reportID;

 function items(){
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


    var numTicketsText = "<br>" + maxReportNumTickets + " Tickets in the Queue";


    if(maxReportNumTickets == 50 && ((((((maxReport.childNodes)[1]).childNodes)[3]).childNodes)[3].textContent.length > 0)){ //Decide whether to use the TD ticket counter or our ticket counter
        var numitems = (((((maxReport.childNodes)[1]).childNodes)[3]).childNodes)[3].textContent;
        numTicketsText = "<br>" + numitems + " in the Queue";
    }
    if(numitems || maxReportNumTickets){
        var htmlString = '<div style="Font-Size: 40px; text-align:center;">' + numTicketsText + '</div>';
        var divv = document.createElement('div');
        divv.innerHTML = htmlString;
       var topp = document.getElementById('divContent');
        topp.style.padding = "0px";
        topp.parentNode.insertBefore(divv, topp);

    }
 }
