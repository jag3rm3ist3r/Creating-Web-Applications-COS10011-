/**
* Author: Grima Wormtongue
* Target: confirm.html
* Purpose: Load data from session storage and submit to server
* Credits: J.R. Tolkein
*/
"use strict";
/*get variables from form and check rules*/
function validate(){

	var errMsg = "";	/* stores the error message */
	var result = true;	/* assumes no errors */


	return result;    //if false the information will not be sent to the server
}

//This should be really be calculated securely on the server!
function calcCost(trips, ps){
	var cost = 0;
	if (trips[0] != "") cost = 200;
	if (trips[1] != "") cost += 1500;
	if (trips[2] != "") cost += 3000;
	return cost * ps;
}

function getBooking(){
	var cost = 0;
	if(sessionStorage.firstname != undefined){    //if sessionStorage for username is not empty
		//confirmation text
		document.getElementById("confirm_name").textContent = sessionStorage.firstname + " " + sessionStorage.lastname;
		document.getElementById("confirm_age").textContent = sessionStorage.age;
		var tmpStr = "";
		if(sessionStorage.i1d == "true") {tmpStr += "1 day, "}
		if(sessionStorage.i4d == "true") {tmpStr += "4 day, "}
		if(sessionStorage.i10d == "true") {tmpStr += "10 day"}
		document.getElementById("confirm_trip").textContent = tmpStr;
		document.getElementById("confirm_species").textContent = sessionStorage.species;
		document.getElementById("confirm_food").textContent = sessionStorage.food;
		document.getElementById("confirm_partySize").textContent = sessionStorage.partysize;
		cost = calcCost(sessionStorage.trip, sessionStorage.partysize);
		document.getElementById("confirm_cost").textContent = cost;
		//fill hidden fields
		document.getElementById("firstname").value = sessionStorage.firstname;

		document.getElementById("firstname").textContent = sessionStorage.firstname;
		document.getElementById("lastname").textContent = sessionStorage.lastname;
		document.getElementById("age").textContent = sessionStorage.age;

		document.getElementById("1day").checked = true;
		document.getElementById("4day").checked = true;
		document.getElementById("10day").checked = true;
		/*
		if(sessionStorage.i1d == "true") {
			document.getElementById("1day").checked = true;
		}
		if(sessionStorage.i4d == "true") {
			document.getElementById("4day").checked = true;
		}
		if(sessionStorage.i10d == "true") {
			document.getElementById("10day").checked = true;
		}
		*/
		document.getElementById("species").textContent = sessionStorage.species;
		document.getElementById("food").textContent =sessionStorage.food;
		document.getElementById("partysize").textContent = sessionStorage.partysize;

		document.getElementById("cost").value = cost;
	}
}

function cancelBooking() {
	window.location = "register.html";
}

function init () {
	getBooking();
	var bookForm = document.getElementById("bookform");
	bookForm.onsubmit = validate;
	var cancelButton = document.getElementById("cancelButton");
	cancelButton.onclick = cancelBooking;
 }

window.onload = init;
