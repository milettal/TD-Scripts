// ==UserScript==
// @name         Duo Reactivation Ticket Button on Reftool
// @namespace    http://tampermonkey.net/
// @version      2.0.1
// @description  Adds a button to create a new duo reactivation ticket with the appropriate fields filled out
// @author       Zachary Morello
// @match        https://tools.is.oregonstate.edu/reftool2/*
// @include      https://tools.is.oregonstate.edu/reftool2/*
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=39063&RequestorUID=de751dc3-eeb7-e611-80cd-000d3a13db68&/duo-reactivation
// @include      https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=39063*
// @grant        none
// ==/UserScript==

var UID = "de751dc3-eeb7-e611-80cd-000d3a13db68";
var URL = window.location.href;


if(URL.indexOf("tools.is.oregonstate.edu/reftool2/") >=0){
    try{
        window.setTimeout(put_button, 1500);
    }
    catch(TypeError){
        window.setTimeout(put_button, 1500);
    }

}
else if(URL.indexOf("&/duo-reactivation") >=0){
    window.setTimeout(fill_form_duo_reactivation, 500);
}
//Search for UID every 0.5 seconds
setInterval(ScanForUID,50);

/*
***Finds the User ID for the currently searched person
*/
function ScanForUID(){
    if(document.getElementById("account-details") != null) {
        var open_tickets = document.getElementById("goto-tickets");
        var parent = open_tickets.parentNode;
        var href = parent.children[2].href;
        console.log("UID = ",href.split("UID=")[1]);
        UID = href.split("UID=")[1];

    }
}



function fill_form_duo_reactivation(){
    var status = document.getElementById("attribute1306");
    status = status.children;
    for(var i=0; i<status.length;i++){
        if(status[i].innerText = "false" && status[i].getAttribute("value") == "17738"){
            status[i].innerText = "Closed";
            status[i].setAttribute("value", "17742"); //inspect element on the status form in a ticket to find status #
            break;
        }
    }
    var by = document.getElementById("attribute3955");
    by = by.children;
    by[0].setAttribute("value", "793");
    by[0].innerText = "Phone";
    var title = document.getElementById("attribute1303");
    title.value = "Duo Reactivation";
    var body = document.getElementById("attribute2937");
    body.innerText = "Customer has a new phone, and needs to reactivate their device.";
	var technotes = document.getElementById("attribute53162");
	technotes.innerText = "Instructed customer to go to duo.oregonstate.edu, had them click 'reactivate device' and walked them through the reactivation process";
	var duosupportitem = document.getElementById("attribute74632Choice183929");
    //It's hard to tell which one of these operations actually does what I need it to do so I did all of them at once
	duosupportitem.value = "true";
	//Support item is still valid but to prevent confusion I set it to be visually checked
    duosupportitem.checked =true;
    //call the "onclick" function for the element manually
    var click = duosupportitem["onclick"];
	click.call(duosupportitem);
}

/*
****Put the button doofus
*/
function put_button(){
    var search = document.getElementById("search");

    // 1. Create the button
    var button1 = document.createElement("form-button");
    button1.setAttribute("type", "button");
    button1.innerHTML = "Duo Reactivation Ticket";
    button1.setAttribute("class", "btn btn-default");
    button1.setAttribute("id", "duo-reactivation-button");

    // 2. Append somewhere
    search.appendChild(button1);

    // 3. Add event handler
    button1.addEventListener("click", click_reactivation_button);

    // Function that handles click of form button
    function click_reactivation_button(){
        var url = "https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=39063&RequestorUID="+UID+"&/duo-reactivation";
        window.open(url, '_blank');
    }

}
