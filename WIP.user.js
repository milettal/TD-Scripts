// ==UserScript==
// @name         Phone@log Button on Reftool
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a button to create a new phone@log ticket with the appropriate fields filled out
// @author       Luke Miletta
// @match        https://tools.is.oregonstate.edu/reftool2/*
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=17681/phonelog
// @grant        none
// ==/UserScript==

var URL = window.location.href;
if(URL === "https://tools.is.oregonstate.edu/reftool2/"){
    window.setTimeout(put_button, 500);
}
else if(URL === "https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=17681/phonelog"){
    window.setTimeout(fill_form, 250);
}

function fill_form(){
    var type = document.getElementById("select2-chosen-6");
    type.innerHTML = ("General / Other/uncategorized");
    var status = document.getElementById("attribute1306");
    console.log(status);
}

function put_button(){
    var search = document.getElementById("search");
    console.log(search);

    // 1. Create the button
    var button1 = document.createElement("form-button");
    button1.setAttribute("type", "button");
    button1.innerHTML = "New Phone@Log Ticket";
    button1.setAttribute("class", "btn btn-default");
    button1.setAttribute("id", "phonelog-button");

    // 2. Append somewhere
    search.appendChild(button1);

    // 3. Add event handler
    button1.addEventListener("click", click_phonelog_button);

    // Function that handles click of form button
    function click_phonelog_button(){
        var url = "https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=17681/phonelog";
        window.open(url, '_blank');
    }
}
