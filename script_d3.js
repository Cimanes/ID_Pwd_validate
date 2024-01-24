// Define the msg element and the input password element (node to be able to use .value)
const
  idTip = d3.select('#idMessage'),
  idIn = d3.select('#idNum').node(),
	pwdTip = d3.select('#pwdMessage'),
	pwdIn = d3.select('#pwd').node(),
  pwdQuality = d3.select('#pwdQuality').node();

// Validate ID input field
idIn.onkeyup =  () => d3.select('#idNum').attr('class', idIn.checkValidity() ? 'valid' : 'invalid');

// Click on the password field => show message box:
pwdIn.onfocus = function() {	
  pwdTip.style('display', 'block'); 
}

// Click outside of the password field => hide the message box:
pwdIn.onblur = function() {	pwdTip.style('display', 'none'); }

// Type inside the password field => check requirements:
pwdIn.onkeyup = function() {

	// Validate lowercase letters using D3
  const lowerReq = /[a-z]/g;
  d3.select("#lower")
    .attr('class', pwdIn.value.match(lowerReq) ? 'valid' : 'invalid')

  // Validate Uppercase letters using D3
  const upperReq = /[A-Z]/g;
  d3.select("#upper")
    .attr('class', pwdIn.value.match(upperReq) ? 'valid' : 'invalid')

  // Validate numbers using D3
  const numberReq = /[0-9]/g;
  d3.select("#number")
    .attr('class', pwdIn.value.match(numberReq) ? 'valid' : 'invalid')
  
  // Validate Symbols using D3
  const symbolReq = /[!@#$%^&*_=+\-]/g;
  d3.select("#symbol")
    .attr('class', pwdIn.value.match(symbolReq) ? 'valid' : 'invalid')

  // Validate length
  d3.select('#length')
    .attr('class', (8 <= pwdIn.value.length) ? 'valid' : 'invalid')

  // Validate password input field
  d3.select('#pwd').attr('class', this.checkValidity() ? 'valid' : 'invalid');

  // Measure quality of the password
  const 
    arrQuality = [
      pwdIn.value.match(lowerReq), 
      pwdIn.value.match(upperReq), 
      pwdIn.value.match(numberReq), 
      pwdIn.value.match(symbolReq), 
      (pwdIn.value.length >= 8)
    ],
    quality = arrQuality.filter(Boolean).length / arrQuality.length;

  // Update quality mark 
  if (pwdIn.value.length > 0) {
    pwdQuality.innerHTML = arrQuality.filter(Boolean).length + " / " + arrQuality.length;  
  }
  else pwdQuality.innerHTML = '';

  // Update color of the password quality bars
  for (let i = 1; i <= arrQuality.length; i++) {
    d3.select('#pwd' + i).attr('class', (quality >= i/5) ? 'show' : 'hide')
  }

}