// ==UserScript==
// @name         Move Status to Top
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Auto-uncheck Notify Responsible
// @author       Tyler Farnham
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New*
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/Edit*
// @grant        none
// ==/UserScript==

var URL = document.location.href;
var StatusInput;
var topElement;
var goesOffHoldInput;
var hasMoved = 0;


var fieldList;
var i;

moveStatusFieldToTop();
function moveStatusFieldToTop(){
    if(URL.indexOf("New") > 0){

        StatusInput = document.getElementById("attribute1306-grp");
        fieldList = document.getElementById("divContent").childNodes[1].childNodes;
        for(i = 0; i < fieldList.length; i++){
            if(fieldList[i] === StatusInput){
                goesOffHoldInput = fieldList[i+2];
                break;
            }
        }
        topElement = document.getElementById("divContent").childNodes[7].childNodes[6];


    }

    else{
        StatusInput = document.getElementById("attribute1306-grp");
        fieldList = document.getElementById("divContent").childNodes[1].childNodes;
        for(i = 0; i < fieldList.length; i++){
            if(fieldList[i] === StatusInput){
                goesOffHoldInput = fieldList[i+2];
                break;
            }
        }
        topElement = document.getElementById("divContent").childNodes[1].childNodes[2];

    }
        topElement.parentNode.insertBefore(StatusInput, topElement);

        topElement.parentNode.insertBefore(goesOffHoldInput, topElement);

}
