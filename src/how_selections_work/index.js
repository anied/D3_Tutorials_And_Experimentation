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
		var renderingArea = d3.select('.renderingArea');


		function update() {
			renderingArea
		}


		d3.select('#lessonOne .section-one .rendering-area .arbitrary-data-label')
		  .text(arrayToDisplayString(data));




	}

	lessonOneSectionOne();

});