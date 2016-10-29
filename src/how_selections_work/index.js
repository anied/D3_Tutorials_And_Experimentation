document.addEventListener('DOMContentLoaded', function () {

	function arrayToDisplayString(inputArr) { //writing for the moment as though I can assume that the array will only ever contain numbers
		return '[ ' + inputArr.toString().replace(new RegExp(',', 'g'), ', ') + ' ]';
	}

	function generateArbitraryData() {
		var outputArr = [];
		var i;

		for (i=0; i<5; i++) {
			outputArr.push(Math.round(Math.random()*100));
		}

		return outputArr;
	}

	function lessonOneSectionOne() {
		var data = generateArbitraryData();
		var renderingArea = d3.select('#lessonOne .rendering-area');


		function update() {
			var boxes = renderingArea.selectAll('div.data-div').data(data);
			var innerBoxes = boxes.select('div.data-p');

			// debugger;

			boxes.enter()
				.append('div')
				.attr('class', 'data-div')
				.text(function (d) { return d; });

			innerBoxes.enter()
				.append('div')
				.attr('class', 'data-div')
				.text(function (d) { return d; });
				

		}


		d3.select('#lessonOne .section-one .rendering-area .arbitrary-data-label')
		  .text(arrayToDisplayString(data));

		update();


	}

	lessonOneSectionOne();

});