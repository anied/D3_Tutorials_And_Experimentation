document.addEventListener('DOMContentLoaded', function () {

	var calcHeight = d3.scale.linear()
	    .domain([0, 100])
	    .range([0, 500]);

	var calcColor = d3.scale.linear()
		.domain([0, 100])
		.rangeRound([0, 255]);

	var inputs = document.querySelectorAll('.graph-bar-val-range');

	function getUpdatedData() {
		var data = [];
		var i;

		for (i = 0; i < inputs.length; i++) {
			data.push(parseInt(inputs[i].value, 10));
		}

		return data;

	}

	function updateGraph(data) {

		function generateRGB(datum) {
			return 'rgb(' + calcColor(datum) + ',0,' + (255-calcColor(datum)) + ')';
		}

		var barGraph = d3.select('.bar-graph')
			.style('padding-top', (500 - calcHeight(d3.max(data))) + 'px')
			.selectAll('div.bar')
				.data(data);

		barGraph.exit().remove();

		barGraph.enter().append('div').classed('bar', true)
				.style({
					'height' : function (d) { return calcHeight(d) + 'px'},
					'background-color' : function (d) { 
						return generateRGB(d);
					}
				});

		barGraph.style({
					'height' : function (d) { return calcHeight(d) + 'px'},
					'background-color' : function (d) { 
						return generateRGB(d);
					}
				});

	}

	function update() {
		var newData = getUpdatedData();
		updateGraph(newData);
	}

	// document.querySelector('#update').addEventListener('click', function () {
	// 	var newData = getUpdatedData();
	// 	updateGraph(newData);
	// });

	document.querySelector('.controls-wrapper').addEventListener('input', update);

	update();

});