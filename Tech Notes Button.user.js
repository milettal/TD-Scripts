// ==UserScript==
// @name         Tech Notes Button on Edit Page
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a button to add a new entry in the tech notes
// @author       Luke Miletta
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/*/Tickets/Edit?TicketID=*
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/*/Tickets/New?formId=*
// @grant        none
// ==/UserScript==

// Date Object
var d = new Date();

//AM or PM function
var am_or_pm = "";
var hours = d.getHours();
if(hours > 11){
    hours = hours - 12;
    am_or_pm = "pm";
}
else if(hours == 0){
    am_or_pm = "am";
    hours = 12;
}
else {
    am_or_pm = "am";
}
var min = d.getMinutes();
if(min < 10){
    min = "0" + min;
}
var time_string = "" + hours + ":" + min + am_or_pm + ":\n";

var date = d.getDate();
if(date < 10){
    date = "0" + date;
}

var date_string = "" + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " " + time_string;

// Form Where Internal Notes Exist
var form = document.getElementById("attribute53162-grp");
var text_field = form.childNodes;
text_field.forEach(function(element){
    if(element.className == "js-ca"){
        text_field = element;
    }
});
console.log(text_field);
text_field = text_field.childNodes;
if(text_field[1]){
    text_field.forEach(function(element){
        if(element.id == "attribute53162"){
            text_field = element;
        }
    });
}
else{
    text_field = text_field[0];
}

// 1. Create the button
var button1 = document.createElement("form-button");
button1.setAttribute("type", "button");
button1.innerHTML = "Add a New Entry";
button1.setAttribute("class", "btn btn-primary btn-sm js-progress-button");
button1.setAttribute("id", "form-button");

// 2. Append somewhere
form.appendChild(button1);

// 3. Add event handler
button1.addEventListener ("click", click_form_button);

// Function that handles click of form button
function click_form_button(){
    // Insert Date and Time Below Data Field
    if(text_field.value == ""){
        text_field.value = date_string;
    }
    else{
        text_field.value = date_string + "\n\n" + text_field.value;
    }

}
