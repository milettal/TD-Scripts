// ==UserScript==
// @name     Color Code Ticket Types
// @namespace  http://tampermonkey.net/
// @version   2.0
// @description Color code the tickets based on types in the queue
// @author    Tyler Farnham / Luke Miletta
// @match    https://oregonstate.teamdynamix.com/TDNext/Home/Desktop/*
// ==/UserScript==

window.setTimeout(items, 100);

var toggleColorButton;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    items() is the main function for this script. It creates the button that toggles the color on the tickets and adds the event listeners for the various buttons that
    this script applies to (i.e. the refresh button on the report, the page select buttons on the bottom of the ticket report, and the button that we create to toggle color.

    If something were to break on this script in the future it would likely be the hard coded paths to elements relative to the maxReport that is selected. Some troubleshooting
    that you can do to fix it is confirm that any element.childNodes.childNodes still points to the correct element upon execution.
    */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function items(){
    var maxReport = getMaxReport();
    if(!maxReport){
        window.setTimeout(items, 100); //Loop the script again
        return;
    }
    else if (maxReport === -1){
        return; //Break out of the script if it finds no reports
    }
    var iii = (((maxReport.reportElement.childNodes)[0]).childNodes)[1];
    // 1. Create the button
    toggleColorButton = document.createElement("i");
    toggleColorButton.innerHTML = "Toggle Color";
    toggleColorButton.setAttribute("class", "fa fa-lg gutter-left-xs");
    toggleColorButton.setAttribute("title", "Toggle Color");
    toggleColorButton.setAttribute("id", "toggle-button");
    toggleColorButton.setAttribute("style", "border-style: solid; padding: 5px; border-width: 1px; border-radius: 5px;");
    // 2. Append somewhere
    iii.appendChild(toggleColorButton);
    iii.insertBefore(toggleColorButton, iii.firstChild);
    // 3. Add event handler
    toggleColorButton.addEventListener ("click", function(){click_form_button(maxReport)});
    // Function that handles click of form button
    // Listens for click of next page buttons
    var next_page = document.getElementsByClassName("pager-link");
    var i;
    for(i = 0; i < next_page.length; i++){
        next_page[i].addEventListener ("click", click_page_button);
    }
    //Listens for click of refresh button
    maxReport.reportElement.childNodes[0].childNodes[1].childNodes[2].addEventListener("click", function(){window.setTimeout(waitUntilRefresh, 50)}, false); //Grabs the refresh button on the maxReport element and applies the click event listener to it


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    waitUntilRefresh() loops on itself while checking the class name of the refresh button on the maxReport element. The refresh button has a class applied to it that
    indicates that it is spinning while the report is refreshing, and it returns to the class that indicates that it is static when it is finished. waitUnitlRefresh()
    calls click_refresh_button when the report is done refreshing.
    */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function waitUntilRefresh(){
        if(maxReport.reportElement.childNodes[0].childNodes[1].childNodes[2].className != "fa fa-refresh fa-lg refresh-module-icon gutter-left-xs"){
            window.setTimeout(waitUntilRefresh, 100);
            return -1;
        }
        else{
            window.setTimeout(click_refresh_button(maxReport), 100);
            return 1;
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    click_refresh_button() reapplies the coloring to all of the tickets after the refresh button is clicked.
    */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function click_refresh_button(maxReport){
    var i;
    var next_page = document.getElementsByClassName("pager-link");
    for(i = 0; i < next_page.length; i++){
        next_page[i].addEventListener ("click", click_page_button);
    }
    var tickets = ((((((maxReport.reportElement.childNodes)[1]).childNodes)[1]).childNodes)[3]);
    tickets = tickets.children;
    if(toggleColorButton.getAttribute("style") === "border-style: solid; padding: 5px; border-width: 1px; border-radius: 5px;"){
        return;
    }
    else{
        setColors(tickets);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    click_page_button() is executed when you click on the page buttons at the bottom of each report. It applies the coloring to the newly loaded tickets after
    switching pages on the ticket report that the script is applied to. It loops on itself until the new tickets are done loading and then applies the coloring to them.
    */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function click_page_button(){
    // Listens for click of next page buttons
    var maxReport = getMaxReport();
    var hasColor = 0;
    if(!maxReport){
        window.setTimeout(click_page_button, 100);
        return;
    }
    else if (maxReport === -1){
        console.log("No reports found after page switch!");
        return -1;
    }
    var next_page = document.getElementsByClassName("pager-link");
    for(var i = 0; i < next_page.length; i++){
        next_page[i].addEventListener ("click", click_page_button);
    }
    var tickets = ((((((maxReport.reportElement.childNodes)[1]).childNodes)[1]).childNodes)[3]);
    tickets = tickets.children;
    if(toggleColorButton.getAttribute("style") === "border-style: solid; padding: 5px; border-width: 1px; border-radius: 5px;"){ //If the tickets are colored already then remove the coloring on them.
        removeColors(tickets);
    }
    else{
        var ticketBackgroundColor = tickets[0].getAttribute("style");
        if(ticketBackgroundColor != null){ //If the color is null then it runs the function again because the tickets on the new page have not loaded yet. Otherwise it sets the color on the newly loaded tickets.
            window.setTimeout(click_page_button, 100);
            return;
        }
        setColors(tickets);
    }
    tickets = ((((((maxReport.reportElement.childNodes)[1]).childNodes)[1]).childNodes)[3]);
    tickets = tickets.children;
    if(tickets[0].getAttribute("style") == null && hasColor == 1){
        window.setTimeout(click_page_button, 100)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    setColors loops through all of the tickets in the maxReport and sets the color on them according to their status.
    */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setColors(tickets){
    for(var i = 0; i < tickets.length; i++){
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    setColors loops through all of the tickets in the maxReport and removes the coloring from them.
    */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function removeColors(tickets){
    for(var i = 0; i < tickets.length; i++){
        tickets[i].setAttribute("style", "");
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    Returns an object that contains the html element of the largest ticket report on the TDx homepage as well as the number of
    tickets that are in that report (this value is whatever the max number of tickets on the report page is if there is more than one report).
    Returns 0 if the ticket elements have not been generated yet and returns -1 if it finds no TDx reports on the homepage (which tells items()
    when to stop running this function).
    */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    click_form_button() is executed when you click on the button that we create for this script. It applies the coloring to all of the tickets in the maxReport
    if there was no coloring already and removes the coloring on the tickets if the tickets were colored already.
    */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function click_form_button(maxReport){
    var i;
    var tickets = ((((((maxReport.reportElement.childNodes)[1]).childNodes)[1]).childNodes)[3]);//Gets the element that holds all of the tickets
    tickets = tickets.children; //The children of that element are the tickets themselves. This is now an array of tickets.
    if(toggleColorButton.getAttribute("style") == "border-style: solid; padding: 5px; border-width: 1px; border-radius: 5px;"){ //If the button is not pressed then press it and set the colors
        toggleColorButton.setAttribute("style", "border-style: solid; padding: 5px; border-width: 1px; border-radius: 5px; background-color: #2b2b2b; color: #f5f5f5;");
        setColors(tickets);
    }
    else{
        toggleColorButton.setAttribute("style", "border-style: solid; padding: 5px; border-width: 1px; border-radius: 5px;"); //If the button is pressed then un-press it and remove the colors.
        removeColors(tickets);
    }
}
