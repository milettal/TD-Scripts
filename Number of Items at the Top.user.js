// ==UserScript==
// @name         Number of Items at the Top
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Grabs the number of items in the queue and pastes it in the top
// @author       Luke Miletta
// @match        https://oregonstate.teamdynamix.com/TDNext/Home/Desktop/*
// @grant        none
// ==/UserScript==

window.setTimeout(items, 1000);

function items(){
    var numitems = (((((document.getElementById("3327294").childNodes)[1]).childNodes)[3]).childNodes)[3].textContent;
    numitems = "<br>" + numitems + "in the Queue";
    var htmlString = '<div style="Font-Size: 40px; text-align:center;">' + numitems + '</div>';
    var divv = document.createElement('div');
    divv.innerHTML = htmlString;
    var topp = document.getElementById('divContent');
    topp.style.padding = "0px";
    topp.parentNode.insertBefore(divv, topp);
}

