document.addEventListener('DOMContentLoaded', function () {

	var calcHeight = d3.scale.linear()
	    .domain([0, 100])
	    .range([0, 500]);

	var calcColor = d3.scale.linear()
		.domain([0, 100])
		.range([0, 255]);

	function generateRGB(datum) {
		return 'rgb(' + calcColor(datum) + ',0,' + (255-calcColor(datum)) + ')';
	}

	var data = [20,40,60,80,100];

	d3.select('.bar-graph')
		.style('padding-top', (500 - calcHeight(d3.max(data))) + 'px')
		.selectAll('div.bar')
			.data(data)
		.enter().append('div').classed('bar', true)
			.style({
				'height' : function (d) { return calcHeight(d) + 'px'},
				'background-color' : function (d) { return generateRGB(d) }
			});
});