"use strict"


function storeBooking(	fn, ln, a, s, i1d,
						i4d, i10d, ps, f) {
	// Store values to sessionStorage.
	sessionStorage.firstname =  fn;

	sessionStorage.lastname = ln;

	sessionStorage.age = a;

	sessionStorage.species = s;

	sessionStorage.i1d = i1d;
	sessionStorage.i4d = i4d;
	sessionStorage.i10d = i10d;

	sessionStorage.food = f;

	sessionStorage.partysize = ps;
}


function validate() {
	var errMsg = "";
	var result = true;

	// Get variables from form and check values here.
	// First name
	var firstName = document.getElementById("firstname").value;
	if(!firstName.match(/^[a-zA-Z]+$/)) {
		errMsg += "Your first name must only contain alpha characters.\n";
		result = false;
	}
	// Last name
	var lastName = document.getElementById("lastname").value;
	if(!lastName.match(/^[a-zA-Z\-]+$/)) {
		errMsg += "Your first name must only contain alpha characters or a hyphen.\n";
		result = false;
	}
	// Age
	var age = document.getElementById("age").value;
	if(isNaN(age) || age < 18 || age > 10000) {
		errMsg += "Age must be a number between 18 and 10,000 years.\n";
		result = false;
	}
	// Number of travellers
	var partySize = document.getElementById("partysize").value;
	if(isNaN(partySize) || partySize < 1 || partySize > 100) {
		errMsg += "Party size must be a number between 1 and 100.\n";
		result = false;
	}

	if(document.getElementById("food").value == "none") {
		errMsg += "You must select a food preference.\n";
		result = false;
	}

	// Check options have been selected.
	var speciesRadioButtons = document.querySelectorAll('input[name="species"]');
	var isChecked = 0;
	var selectedSpeciesName = null;
	for(var i = 0; i < speciesRadioButtons.length; i++) {
		if(speciesRadioButtons[i].checked == true) {
			isChecked++;
			selectedSpeciesName = speciesRadioButtons[i].value;
		}
	}
	if(isChecked == 0) {
		errMsg += "You must select a species.\n";
		result = false;
	}

	var is1day = document.getElementById("1day").checked;
	var is4day = document.getElementById("4day").checked;
	var is10day = document.getElementById("10day").checked;
	if(!(is1day || is4day || is10day)) {
		errMsg += "Please select at least one trip.\n";
		result = false;
	}

	var beardLength = document.getElementById("beard").value;
	sessionStorage.beard = beardLength;
	function speciesAgeError(tmpAge) {
		if(age > tmpAge) {
			errMsg +=	"You cannot be a " + selectedSpeciesName +
						" and over " + tmpAge + ".\n";
			result = false;
		}
	}
	switch(selectedSpeciesName) {
		case "Human":
			speciesAgeError(120);
			break;
		case "Dwarf":
			speciesAgeError(150);
			if(age > 30 && beardLength < 12) {
				errMsg +=	"All dwarves over 30 years old have at least a 12" +
							"inch beard.\n"
				result = false;
			}
			break;
		case "Hobbit":
			speciesAgeError(150);
			if(beardLength > 0) {
				errMsg += "Hobbits do not grow beards.\n";
				result = false;
			}
			break;
		case "Elf":
			if(beardLength > 0) {
				errMsg += "Elves do not grow beards.\n";
				result = false;
			}
			break;
		default:
			if(isChecked > 0) {
				errMsg += "We don't allow your kind on our tours.\n"
				result = false;
			}
	}

	if (errMsg != "") {
		// Complain.
		alert(errMsg);
	}

	if(result) {
		storeBooking(	firstName, lastName, age, selectedSpeciesName, is1day,
						is4day, is10day, partySize,
						document.getElementById("food").value);
	}
	return result;
}

function prefill_form() {
	if(sessionStorage.firstname != undefined) {
		document.getElementById("firstname").value = sessionStorage.firstname;
		document.getElementById("lastname").value = sessionStorage.lastname;
		document.getElementById("age").value = sessionStorage.age;
		document.getElementById("beard").value = sessionStorage.beard;
		if(sessionStorage.i1d == "true") {
			document.getElementById("1day").checked = true;
		}
		if(sessionStorage.i4d == "true") {
			document.getElementById("4day").checked = true;
		}
		if(sessionStorage.i10d == "true") {
			document.getElementById("10day").checked = true;
		}
		document.getElementById("food").value = sessionStorage.food;
		document.getElementById("partysize").value = sessionStorage.partysize;

		switch(sessionStorage.species) {
			case "Human":
				document.getElementById("human").checked = true;
				break;
			case "Dwarf":
				document.getElementById("dwarf").checked = true;
				break;
			case "Hobbit":
				document.getElementById("hobbit").checked = true;
				break;
			case "Elf":
				document.getElementById("elf").checked = true;
				break;
		}
	}
}

function init() {
	prefill_form();
	var regForm = document.getElementById("regform");
	regForm.onsubmit = validate;
}


window.onload = init;
