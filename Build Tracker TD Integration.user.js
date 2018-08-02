// ==UserScript==
// @name         Build Tracker TD Integration
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Testing Build tracker TD integration
// @author       You
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/TicketDet?TicketID=*
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/TicketDet.aspx?TicketID=*
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/TicketDet?TicketID=*&BTI
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/TicketDet?.aspx?TicketID=*&BTI
// @match        https://tools.is.oregonstate.edu/build-tracker/builds/*?checkBuildTicketNumber*
// @match        https://tools.is.oregonstate.edu/build-tracker/interviews/*?checkInterviewTicketNumber*
// @match        https://tools.is.oregonstate.edu/build-tracker/interviews/create?ticketNumber*
// @grant        none
// ==/UserScript==

var URL = window.location.href;
if(URL.indexOf("&\stop") >= 0){
    return;
}
else if(URL.indexOf("?checkBuildTicketNumber") >=0){
    window.setTimeout(checkBuildForTicketNumber, 20);
}
else if(URL.indexOf("&\BTI") >=0){
    window.onload = insertButton();
}
else if(URL.indexOf("https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/TicketDet") >=0){
    window.onload = sendToBuildTracker();
}
else if (URL.indexOf("?checkInterviewTicketNumber") >=0){
    window.setTimeout(checkForRealInterview, 20);
}
else if (URL.indexOf("create?ticketNumber") >= 0){
    window.setTimeout(fillInInterviewTicketNumber(URL), 100);
}

function sendToBuildTracker(){
    if(document.body.innerHTML.toString().indexOf("Interview #") > -1){
        insertButton("Build");
        return;
    }
    else{
        insertButton("Interview");
        return;
        //var ticketNumber = document.getElementById("thTicket_copyControl_btnCopyID").value
        //window.location.href = ("https://tools.is.oregonstate.edu/build-tracker/builds/" + ticketNumber + "?checkTicketNumber" + ticketNumber);
    }
}
function checkBuildForTicketNumber(){
    var URL = window.location.href.toString();
    console.log("are we here?");
    var ticketNumber = URL.substring(URL.length-7, URL.length);
    console.log(ticketNumber);
    if(document.body.innerHTML.toString().indexOf(ticketNumber) > -1){
        console.log("This is the build for ticket " + ticketNumber + "!");
        window.location.href = ("https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/TicketDet?TicketID=" + ticketNumber + "&\BTI");
    }
    else{
        console.log("At least we executed!");
        window.location.href = "https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/TicketDet?TicketID=" + ticketNumber + "&\stop";
    }
}
function insertButton(buttonMode){
    console.log("ITS A CHRISTMAS MIRACLE");
    //var box = document.getElementById("pcRequestor_divPersonInfo");
    var box = document.getElementById("divTabHeader");
    //var name = (((((((box.childNodes)[1]).childNodes)[1]).childNodes)[3]).childNodes)[1];
    var name = ((box.childNodes)[0])
    name = name.textContent;
    name = name.trim();
    var firstName = name.split(' ').slice(0, -1).join(' ');
    var lastName = name.split(' ').slice(-1).join(' ');

    // 1. Create the button
    var button1 = document.createElement("form-button");
    button1.setAttribute("type", "button");
    if(buttonMode == "Build"){
        button1.innerHTML = "Open in Build Tracker";
    }
    else{
        button1.innerHTML = "Build Tracker Interview";
    }
    button1.setAttribute("class", "btn btn-primary btn-sm js-progress-button");
    button1.setAttribute("id", "BTButton");

    // 2. Append somewhere
    ((box.childNodes)[1]).appendChild(button1);

    // 3. Add event handler
    if(buttonMode == "Build"){
        button1.addEventListener ("click", clickBTButtonBuild);
    }
    else{
        button1.addEventListener ("click", clickBTButtonInterview);
    }
    // Function that handles click of form button

}

function clickBTButtonBuild(){
    var ticketNumber = document.getElementById("thTicket_copyControl_btnCopyID").value
    window.open("https://tools.is.oregonstate.edu/build-tracker/builds/" + ticketNumber);
}
function clickBTButtonInterview(){
    var ticketNumber = document.getElementById("thTicket_copyControl_btnCopyID").value
    window.open("https://tools.is.oregonstate.edu/build-tracker/interviews/" + ticketNumber +"?checkInterviewTicketNumber" + ticketNumber);
}
function checkForRealInterview(){
    var URL = window.location.href.toString();
    console.log("are we here?");
    var ticketNumber = URL.substring(URL.length-7, URL.length);
    console.log(ticketNumber);
    if(document.body.innerHTML.toString().indexOf(ticketNumber) > -1){
        console.log("This is the interview for ticket " + ticketNumber + "!");
    }
    /*else{
        console.log("At least we executed! Redirecting to Interview creation page");
        window.location.href = "https://tools.is.oregonstate.edu/build-tracker/interviews/create?ticketNumber" + ticketNumber;
    }*/
}

function fillInInterviewTicketNumber(URL){
    window.setTimeout((function(){
        var ticketNumber = URL.substring(URL.length-7, URL.length);

        //document.getElementById("input_1").value = ticketNumber;
        document.getElementsByClassName("md-toolbar-tools").item(1).innerHTML = "Create New Interview For Ticket #" + ticketNumber;
        //console.log(ticketTextbox);
    }), 100);
}