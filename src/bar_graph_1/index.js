document.addEventListener('DOMContentLoaded', function () {

	var x = d3.scale.linear()
	    .domain([0, 100])
	    .range([0, 500]);


	var data = [10,20,30,40,50];

	d3.select('.bar-graph')
		.style('padding-top', (500 - x(d3.max(data))) + 'px')
		.selectAll('div.bar')
			.data(data)
		.enter().append('div').classed('bar', true)
			.style('height', function (d) { return x(d) + 'px'});
});