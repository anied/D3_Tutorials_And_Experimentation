document.addEventListener("DOMContentLoaded", function() {

	var letters = d3.selectAll('.letter');

	window.setTimeout(function () {
		d3.selectAll('.big-title').style('opacity', 1);
	}, 0);

	window.setInterval(function () {
		letters.style('color', function () {
			return "hsl(" + Math.random() * 360 + ",100%,50%)"; // lifted from D3 welcome page
		});
	}, 1000);

});