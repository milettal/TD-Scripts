// ==UserScript==
// @name         Build Tracker TD Integration
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  Testing Build tracker TD integration
// @author       Tyler Farnham
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

else if(URL.indexOf("https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/TicketDet") >=0){
    window.onload = checkForBuild();
}
else if (URL.indexOf("?checkInterviewTicketNumber") >=0){
    window.setTimeout(checkForRealInterview, 100);
}
else if (URL.indexOf("create?ticketNumber") >= 0){
    window.setTimeout(fillInInterviewTicketNumber(URL), 10);
}

function checkForBuild(){ //If there is the text "Interview #" (which is always created in the ticket when an interview is finalized) then it creates the button to go to the build, otherwise it makes the button that goes to the interview.
    if(document.body.innerHTML.toString().indexOf("Interview #") > -1){
        insertButton("Build");
        return;
    }
    else{
        insertButton("Interview");
        return;
    }
}
/*function checkBuildForTicketNumber(){ //This function is now obsolete, but I am keeping it here for reference just in case I want to do something with it later.
    var URL = window.location.href.toString();
    var ticketNumber = URL.substring(URL.length-7, URL.length);
    if(document.body.innerHTML.toString().indexOf(ticketNumber) > -1){
        window.location.href = ("https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/TicketDet?TicketID=" + ticketNumber + "&\BTI");
    }
    else{
        window.location.href = "https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/TicketDet?TicketID=" + ticketNumber + "&\stop";
    }
}*/
function insertButton(buttonMode){
    var box = document.getElementById("divTabHeader"); //The buttons accross the top of the ticket page.
    var name = ((box.childNodes)[0])
    name = name.textContent;
    name = name.trim();
    var firstName = name.split(' ').slice(0, -1).join(' ');
    var lastName = name.split(' ').slice(-1).join(' ');

    // 1. Create the button with either the Build or Interview attributes
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

    // 2. Append on the end end of the list of buttons that goes accross the top of the ticket page.
    ((box.childNodes)[1]).appendChild(button1);

    // 3. Add event handler
    if(buttonMode == "Build"){ //Adds the correct button action based on whether or not there is a build for the ticket.
        button1.addEventListener ("click", clickBTButtonBuild);
    }
    else{
        button1.addEventListener ("click", clickBTButtonInterview);
    }
    // Function that handles click of form button

}

function clickBTButtonBuild(){ //Activated when the BT Button is pressed and there is a build for the ticket. Redirects to the corresponding build page.
    var ticketNumber = document.getElementById("thTicket_copyControl_btnCopyID").value //Grabs the ticket number off of the ticket page.
    window.open("https://tools.is.oregonstate.edu/build-tracker/builds/" + ticketNumber);
}
function clickBTButtonInterview(){//Activated when the BT Button is pressed and there is no build for the ticket. Redirects to the possible interview page for the ticket.
    var ticketNumber = document.getElementById("thTicket_copyControl_btnCopyID").value; //Grabs the ticket number off of the end of the URL
    window.open("https://tools.is.oregonstate.edu/build-tracker/interviews/" + ticketNumber +"?checkInterviewTicketNumber" + ticketNumber);
}
function checkForRealInterview(){ //Checks to see if an interview exists for the ticket alread and, if there is no interview, it redirects to the "Create Interview" page.
    window.setTimeout(function(){
        var URL = window.location.href.toString();
        var ticketNumber = URL.substring(URL.length-7, URL.length); //Grabs the ticket number off of the end of the URL
        if(document.body.innerHTML.toString().indexOf(ticketNumber) > -1){
        }
        else{
            window.location.href = "https://tools.is.oregonstate.edu/build-tracker/interviews/create?ticketNumber" + ticketNumber;

        }
    }, 75);
}


function fillInInterviewTicketNumber(URL){ //Adds the ticket number to the title of the Create Interview page that the user is redirected to.
    window.setTimeout((function(){
        var ticketNumber = URL.substring(URL.length-7, URL.length);
        document.getElementsByClassName("md-toolbar-tools").item(1).innerHTML = "Create New Interview For Ticket #" + ticketNumber;
    }), 100);
}