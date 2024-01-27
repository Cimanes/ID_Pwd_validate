// Define the msg element and the input password element (node to be able to use .value)
const idTip = document.getElementById("idMessage"),
	idIn = document.getElementById("idNum"),
	pwdTip = document.getElementById("pwdMessage"),
	pwdIn = document.getElementById("pwd");

// Validate ID input field
idIn.onkeyup = function () {
	if (this.checkValidity()) {
		this.classList.remove("invalid");
		this.classList.add("valid");
	} else {
		this.classList.remove("valid");
		this.classList.add("invalid");
	}
};

// Click on the password field => show the message box:
pwdIn.onfocus = function () {
	pwdTip.style.display = "block";
};

// Click outside of the password field => hide the message box:
pwdIn.onblur = function () {
	pwdTip.style.display = "none";
};

// Type inside the password field => check requirements:
pwdIn.onkeyup = function () {
	// Validate lowercase letters
	const lower = document.getElementById("lower"),
		lowerReq = /[a-z]/g;
	if (pwdIn.value.match(lowerReq)) 		lower.classList.replace('invalid', 'valid');
	else lower.classList.replace('valid', 'invalid');

	// Validate capital letters
	const upper = document.getElementById("upper"),
		upperReq = /[A-Z]/g;
	if (pwdIn.value.match(upperReq)) 		upper.classList.replace('invalid', 'valid');
	else upper.classList.replace('valid', 'invalid');

	// Validate numberReq
	const number = document.getElementById("number"),
		numberReq = /[0-9]/g;
	if (pwdIn.value.match(numberReq))		number.classList.replace('invalid', 'valid');
	else number.classList.replace('valid', 'invalid');

	// Validate symbols
	const symbol = document.getElementById("symbol"),
		symbolReq = /[!@#$%^&*_=+\-]/g;
	if (pwdIn.value.match(symbolReq)) 	symbol.classList.replace('invalid', 'valid');
	else symbol.classList.replace('valid', 'invalid');

	// Validate length
	const length = document.getElementById("length");
	if (pwdIn.value.length >= 8) 				length.classList.replace('invalid', 'valid');
  else length.classList.replace('valid', 'invalid');

	// Global validation
	if (pwdIn.checkValidity()) 					pwdIn.classList.replace('invalid', 'valid');
	else pwdIn.classList.replace('valid', 'invalid');

	// Measure quality of the password
	const arrQuality = [
			pwdIn.value.match(lowerReq),
			pwdIn.value.match(upperReq),
			pwdIn.value.match(numberReq),
			pwdIn.value.match(symbolReq),
			pwdIn.value.length >= 8
		],
		quality = arrQuality.filter(Boolean).length / arrQuality.length;

	// Update quality mark
	if (pwdIn.value.length > 0) {
		pwdQuality.innerHTML =
			arrQuality.filter(Boolean).length + " / " + arrQuality.length;
	} else pwdQuality.innerHTML = "";

	// Update colored bars
	for (let i = 1; i <= arrQuality.length; i++) {
		const bar = document.getElementById("pwd" + i);
		if (quality >= i / 5) {
			bar.classList.remove("hide");
			bar.classList.add("show");
		} else {
			bar.classList.remove("show");
			bar.classList.add("hide");
		}
	}
};
