// ==UserScript==
// @name         Exchange Migration Help Button
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Adds a button to create a generic support ticket for support in helping someone log in after exchange has migrated.
// @author       Zachary Morello
// @match        https://tools.is.oregonstate.edu/reftool2/*
// @include      https://tools.is.oregonstate.edud/reftool2/*
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=17631&RequestorUID=de751dc3-eeb7-e611-80cd-000d3a13db68&/exchange-migration-help
// @include      https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=17631*
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
else if(URL.indexOf("&/exchange-migration-help") >=0){
    window.setTimeout(fill_ticket_forms, 500);
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
/*
Sets the support item checkbox value to true
Attribute and choice are found by inspecting the element of the ticket creation page.
Take note that some creation pages have differant service offering lists, like Duo and Device/Application Support
*/
function set_support_item(attribute,choice){
    var exchangesupportitem = document.getElementById("attribute"+ attribute + "Choice"+ choice);
    //It's hard to tell which one of these operations actually does what I need it to do so I did all of them at once
	exchangesupportitem.value = "true";
	//Support item is still valid but to prevent confusion I set it to be visually checked
    exchangesupportitem.checked =true;
    //call the "onclick" function for the element manually
    var click = exchangesupportitem["onclick"];
	click.call(exchangesupportitem);
}

//You can find a formID by going to the IT tab and looking at the differant urls that open when you open the "+New" dropdown menu
function fill_ticket_forms(){
    var status = document.getElementById("attribute1306"); //closed
    status = status.children;
    for(var i=0; i<status.length;i++){
        if(status[i].innerText = "Closed"){
            status[i].setAttribute("selected","selected");
            status[i].setAttribute("value", "17742");
            break;
        }
    }
    var by = document.getElementById("attribute3955"); //Source of the call
    by = by.children;
    by[0].setAttribute("value", "793"); //phone
    by[0].innerText = "Phone";
    var title = document.getElementById("attribute1303"); //title attribute
    title.value = "Exchange Migration Login Help"; 
    var body = document.getElementById("attribute2937");
    body.innerText = "Customer is having trouble logging into their exchange mail after they migrated to exchange online.";
	var technotes = document.getElementById("attribute53162"); //technotes attribute
    technotes.innerText = "Walked them through logging in with the microsoft federation services page.";
    set_support_item("38159","91502") //set "Microsoft Outlook, Outlook Web App, Exchange" to true

}

/*
****Put the button doofus
*/
function put_button(){
    var search = document.getElementById("search");

    // 1. Create the button
    var button1 = document.createElement("form-button");
    button1.setAttribute("type", "button");
    button1.innerHTML = "Exchange Migration Help";
    button1.setAttribute("class", "btn btn-default");
    button1.setAttribute("id", "exchange-migration-button");

    // 2. Append somewhere
    search.appendChild(button1);

    // 3. Add event handler
    button1.addEventListener("click", click_ticket_button);

    // Function that handles click of form button
    function click_ticket_button(){
        var url = "https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=17631&RequestorUID="+UID+"&/exchange-migration-help";
        window.open(url, '_blank');
    }

}
