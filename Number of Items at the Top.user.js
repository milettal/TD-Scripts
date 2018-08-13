// ==UserScript==
// @name         Number of Items at the Top
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Grabs the number of items in the queue and pastes it in the top. Note: It gets the number of tickets from the largest report
// @             that you have on your desktop, so if you have multiple similarly sized reports than it will grab the largest one. Additionally,
// @             if you have multiple reports over 50 tickets, then it will grab the number of tickets from the one that is closest to the top of your screen.
// @
// @             Another note: If you see weird characters showing up in place of your TD buttons then you need to clear your browser cache.
// @
// @author       Tyler Farnham / Luke Miletta
// @match        https://oregonstate.teamdynamix.com/TDNext/Home/Desktop/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

/*var tdRunCount = GM_getValue("tdRunCount", 0);
if(tdRunCount == 0){
    GM_setValue("tdRunCount", 1);
    return;
}
else{
    GM_setValue("tdRunCount", 0);
  window.setTimeout(items, 100);
    return;
}*/
window.setTimeout(items, 100);
var reportID;
function items(){
    //GM_setValue("tdRunCount", 0);
    var maxReport;
    var currentReport;
    var maxReportNumTickets = 0;
    var currentReportNumTickets = 0;
    var currentTicketTable;
    var reports = document.getElementsByClassName("report-module");
    var whichReport = 0;
    for (var i = 0; i < reports.length; i++) { //Wait for all of the elements to load into each report and then find the report with the most tickets in it.
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
            else {continue;}
        }
        else{
            window.setTimeout(items, 100);
            return;
        }
    }

    var numTicketsText = "<br>" + maxReportNumTickets + " Tickets in the Queue";


    if(maxReportNumTickets == 50 && (maxReport.getElementsByClassName("TDPagerRow").length > 0)){ //Decide whether to use the TD ticket counter or our ticket counter
        var numitems = (((((maxReport.childNodes)[1]).childNodes)[3]).childNodes)[3].textContent;
        numTicketsText = "<br>" + numitems + " in the Queue";
    }

    if(numitems || maxReportNumTickets){ //Insert the # of tickets text at the top of the page.
        var htmlString = '<div style="Font-Size: 40px; text-align:center;">' + numTicketsText + '</div>';
        var divv = document.createElement('div');
        divv.innerHTML = htmlString;
        var topp = document.getElementById('divContent');
        topp.style.padding = "0px";
        topp.parentNode.insertBefore(divv, topp);

    }
    if(maxReport){
        if(maxReport.childNodes[0]){

            if(maxReport.childNodes[0].childNodes[1]){

                maxReport.childNodes[0].childNodes[1].childNodes[2].addEventListener("click", function(){window.setTimeout(waitUntilRefresh, 50)}, false);
                function waitUntilRefresh(){
                    if(maxReport.childNodes[0].childNodes[1].childNodes[2].className != "fa fa-refresh fa-lg refresh-module-icon gutter-left-xs"){
                        window.setTimeout(waitUntilRefresh, 100);
                        return -1;
                    }
                    else{
                        window.setTimeout(ree(maxReport, maxReportNumTickets), 100);
                        return 1;
                    }
                }
            }
            else{window.setTimeout(items, 100)};
        }
        else{window.setTimeout(items, 100)};
    }
    else{window.setTimeout(items, 100)};
}


function ree(maxReport, maxReportNumTickets){
    var numTicketsText = "<br>" + maxReportNumTickets + " Tickets in the Queue";
    if((maxReportNumTickets == 50) && (maxReport.getElementsByClassName("TDPagerRow").length > 0)){ //Decide whether to use the TD ticket counter or our ticket counter
        var numitems = (((((maxReport.childNodes)[1]).childNodes)[3]).childNodes)[3].textContent;
        numTicketsText = "<br>" + numitems + " in the Queue";
    }
    if(numitems || maxReportNumTickets){

        var htmlString = '<div style="Font-Size: 40px; text-align:center;">' + numTicketsText + '</div>';
        var divv = document.getElementById('form1').childNodes[27].childNodes[1];
        divv.innerHTML = htmlString;
        var topp = document.getElementById('divContent');
        topp.style.padding = "0px";
        topp.parentNode.insertBefore(divv, topp);
    }
}
