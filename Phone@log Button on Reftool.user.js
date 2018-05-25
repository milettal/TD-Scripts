// ==UserScript==
// @name         Phone@log Button on Reftool
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a button to create a new phone@log ticket with the appropriate fields filled out
// @author       Luke Miletta
// @match        https://tools.is.oregonstate.edu/reftool2/*
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=17631&RequestorUID=de751dc3-eeb7-e611-80cd-000d3a13db68&/phonelog
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=17631&RequestorUID=de751dc3-eeb7-e611-80cd-000d3a13db68&/transcripts
// @grant        none
// ==/UserScript==

var URL = window.location.href;
if(URL.indexOf("tools.is.oregonstate.edu/reftool2/") >=0){
    window.setTimeout(put_button, 750);
}
else if(URL.indexOf("&/phonelog") >=0){
    window.setTimeout(fill_form_generic, 500);
}
else if(URL.indexOf("&/transcripts") >=0){
    window.setTimeout(fill_form_transcripts, 500);
}

function fill_form_transcripts(){
    var status = document.getElementById("attribute1306");
    status = status.children;
    for(var i=0; i<status.length;i++){
        if(status[i].innerText = "Open" && status[i].getAttribute("value") == "17739"){
            status[i].innerText = "Referred";
            status[i].setAttribute("value", "18214");
            break;
        }
    }
    var by = document.getElementById("attribute3955");
    by = by.children;
    by[0].setAttribute("value", "793");
    by[0].innerText = "Phone";
    var title = document.getElementById("attribute1303");
    title.value = "Transcripts Request";
    var body = document.getElementById("attribute2937");
    body.innerText = "Someone called asking about transcripts. They are a previous student and forgot their ID number. We referred them to the Office of the Registrar.";
}

function fill_form_generic(){
    var status = document.getElementById("attribute1306");
    status = status.children;
    for(var i=0; i<status.length;i++){
        if(status[i].innerText = "Open" && status[i].getAttribute("value") == "17739"){
            status[i].innerText = "Closed";
            status[i].setAttribute("value", "17742");
            break;
        }
    }
    var by = document.getElementById("attribute3955");
    by = by.children;
    by[0].setAttribute("value", "793");
    by[0].innerText = "Phone";
}

function put_button(){
    var search = document.getElementById("search");

    // 1. Create the button
    var button1 = document.createElement("form-button");
    button1.setAttribute("type", "button");
    button1.innerHTML = "Phone@Log Generic";
    button1.setAttribute("class", "btn btn-default");
    button1.setAttribute("id", "phonelog-button");

    // 2. Append somewhere
    search.appendChild(button1);

    // 3. Add event handler
    button1.addEventListener("click", click_phonelog_button);

    // Function that handles click of form button
    function click_phonelog_button(){
        var url = "https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=17631&RequestorUID=de751dc3-eeb7-e611-80cd-000d3a13db68&/phonelog";
        window.open(url, '_blank');
    }


    // 1. Create the button
    var button2 = document.createElement("form-button");
    button2.setAttribute("type", "button");
    button2.innerHTML = "Phone@Log Transcripts";
    button2.setAttribute("class", "btn btn-default");
    button2.setAttribute("id", "phonelog-button");

    // 2. Append somewhere
    search.appendChild(button2);

    // 3. Add event handler
    button2.addEventListener("click", click_transcripts_button);

    // Function that handles click of form button
    function click_transcripts_button(){
        var url = "https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=17631&RequestorUID=de751dc3-eeb7-e611-80cd-000d3a13db68&/transcripts";
        window.open(url, '_blank');
    }
}
