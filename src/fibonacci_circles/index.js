document.addEventListener('DOMContentLoaded', function () {
	
	function calculateSVGDimensions() {
		//TODO-- there may be a better way to handle this...
		var topSection = document.querySelector('#introAndControlsWrapper');
		var svgWrapper = document.querySelector('#fibonacciCirclesWrapper');
		var svg = document.querySelector('#fibonacci-circles');

		svg.style.height = window.innerHeight - topSection.offsetHeight;
		svg.style.width = svgWrapper.getBoundingClientRect().width;
	}


	calculateSVGDimensions();


});