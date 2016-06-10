document.addEventListener('DOMContentLoaded', function () {

	var x = d3.scale.linear()
	    .domain([0, 100])
	    .range([0, 500]);


	d3.select('.bar-graph')
		.selectAll('div.bar')
			.data([10,20,30,40,50])
		.enter().append('div').classed('bar', true)
			.style('height', function (d) { return x(d) + 'px'});
});