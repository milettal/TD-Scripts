// ==UserScript==
// @name         Number of Items at the Top
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Grabs the number of items in the queue and pastes it in the top. Note: It gets the number of tickets from the largest report
// @             that you have on your desktop, so if you have multiple similarly sized reports than it will grab the largest one. Additionally,
// @             if you have multiple reports over 50 tickets, then it will grab the number of tickets from the one that is closest to the top of your screen.
// @
// @author       Tyler Farnham / Luke Miletta
// @match        https://oregonstate.teamdynamix.com/TDNext/Home/Desktop/*
// ==/UserScript==


window.setTimeout(items, 100);
var textInsertCount = 0;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
Items is the main function of the script. It decides whether to use the ticket count returned by getMaxReport() or to use the
ticket count stored in the html element at the bottom of the largest TDx report element. It waits for all of the ticket elements
to load on the page before it fully executes.
*/

function items(){
    var maxReport = getMaxReport();
    if(!maxReport){
        window.setTimeout(items, 100);
        return;
    }
    else if (maxReport === -1){return;}

    ree(maxReport.reportElement, maxReport.maxReportNumTickets);

    refreshOnReportRefresh (maxReport);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
ree() is named ree in rememberance of Luke Miletta who began writing this script, a true memer.
This function inserts the text at the top of your TDx homepage. If there is no text element at the
top already then it makes a new one.
*/

function ree(maxReport, maxReportNumTickets){
    var numTicketsText = "<br>" + maxReportNumTickets + " Tickets in the Queue";
    if((maxReportNumTickets == 50) && (maxReport.getElementsByClassName("TDPagerRow").length > 0)){ //Decide whether to use the TD ticket counter or our ticket counter
        var numitems = (((((maxReport.childNodes)[1]).childNodes)[3]).childNodes)[3].textContent;
        numTicketsText = "<br>" + numitems + " in the Queue";
    }
    if(numitems || maxReportNumTickets){

        var htmlString = '<div style="Font-Size: 40px; text-align:center;">' + numTicketsText + '</div>';
        var divv;
        if(textInsertCount == 0){
            divv = document.createElement('div');
            textInsertCount++;
        }
        else{
            divv = document.getElementById('form1').childNodes[27].childNodes[1];
        }
        divv.innerHTML = htmlString;
        var topp = document.getElementById('divContent');
        topp.style.padding = "0px";
        topp.parentNode.insertBefore(divv, topp);
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
Returns an object that contains the html element of the largest ticket report on the TDx homepage as well as the number of
tickets that are in that report (this value is whatever the max number of tickets on the report page is if there is more than one report).
Returns 0 if the ticket elements have not been generated yet and returns -1 if it finds no TDx reports on the homepage (which tells items()
when to stop running this function).
*/

function getMaxReport(){
    var maxReport = {reportElement: 0, maxReportNumTickets: 0};
    var currentReport;
    var currentReportNumTickets = 0;
    var currentTicketTable;
    var reports = document.getElementsByClassName("report-module");
    if(!reports.length){return -1;}
    for (var i = 0; i < reports.length; i++) { //Wait for all of the elements to load into each report and then find the report with the most tickets in it.
        currentReportNumTickets = 0;

        currentReport = reports[i];
        if(currentReport.childNodes[1].childNodes[1]){

            if((currentReport).childNodes[1].childNodes[1].childNodes.length > 1){
                currentTicketTable = (currentReport).childNodes[1].childNodes[1].childNodes[3].childNodes;
                for(var j = 0; j < currentTicketTable.length; j++){ //count the tickets for each report.
                    if(currentTicketTable[j].nodeName == "TR") {
                        currentReportNumTickets++;
                    }
                }
                if(currentReportNumTickets > maxReport.maxReportNumTickets){ //compare each ticket count against the previous max # of tickets
                    maxReport.maxReportNumTickets = currentReportNumTickets;
                    maxReport.reportElement = currentReport;
                }
            }
            else if(i == reports.length){
                return 0;
            }
            else {continue;}
        }
        else{
            return 0;
        }
    }
    return maxReport;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
Adds the event listener for the refresh button on the report the maxReport. It waits for the refresh to finish and then calls ree() again
which counts the tickets again.
All of the ladder steps of if statements in this function are just making sure that the report has loaded before trying to apply the event listener because otherwise it errors out.
*/

function refreshOnReportRefresh (maxReport){
    if(maxReport.reportElement){
        if(maxReport.reportElement.childNodes[0]){

            if(maxReport.reportElement.childNodes[0].childNodes[1]){

                maxReport.reportElement.childNodes[0].childNodes[1].childNodes[2].addEventListener("click", function(){window.setTimeout(waitUntilRefresh, 50)}, false);
                function waitUntilRefresh(){
                    if(maxReport.reportElement.childNodes[0].childNodes[1].childNodes[2].className != "fa fa-refresh fa-lg refresh-module-icon gutter-left-xs"){
                        window.setTimeout(waitUntilRefresh, 100);
                        return;
                    }
                    else{
                        window.setTimeout(ree(maxReport.reportElement, maxReport.maxReportNumTickets), 100);
                        return;
                    }
                }
            }
            else{window.setTimeout(items, 100)};
        }
        else{window.setTimeout(items, 100)};
    }
    else{window.setTimeout(items, 100)};
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
