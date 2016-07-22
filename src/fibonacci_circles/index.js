document.addEventListener('DOMContentLoaded', function () {
	
	var height;
	var width;
	var svg = document.querySelector('#fibonacci-circles');
	var data = [];

	function calculateSVGDimensions() {
		//TODO-- there may be a better way to handle this...
		var topSection = document.querySelector('#introAndControlsWrapper');
		var svgWrapper = document.querySelector('#fibonacciCirclesWrapper');

		height = window.innerHeight - topSection.offsetHeight;
		width = svgWrapper.getBoundingClientRect().width;

		svg.style.height = height;
		svg.style.width = width;
	}

	function incrementData() {

		var length = data.length;

		if ( length === 0 ) {
			data.push(1);
		} else if ( length === 1 ) {
			data.push(1);
		} else {
			data.push(data[length-1]+data[length-2]);
		}
	}

	function registerEventListeners() {
		document.querySelector('#incrementButton').addEventListener('click', incrementData);
	}

	registerEventListeners();
	calculateSVGDimensions();


});