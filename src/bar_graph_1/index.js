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
			data.push(inputs[i].value);
		}

		return data;

	}

	function updateGraph(data) {

		function generateRGB(datum) {
			return 'rgb(' + calcColor(datum) + ',0,' + (255-calcColor(datum)) + ')';
		}

		d3.select('.bar-graph')
			.style('padding-top', (500 - calcHeight(d3.max(data))) + 'px')
			.selectAll('div.bar')
				.data(data)
			.enter().append('div').classed('bar', true)
				.style({
					'height' : function (d) { return calcHeight(d) + 'px'},
					'background-color' : function (d) { 
						console.log(generateRGB(d));
						return generateRGB(d) 
					}
				});

	}

	document.querySelector('#update').addEventListener('click', function () {
		var newData = getUpdatedData();
		updateGraph(newData);
	});


});