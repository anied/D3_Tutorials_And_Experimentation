document.addEventListener('DOMContentLoaded', function () {

	function sectionOne() {
		var data = [1, 2, 3, 5, 7, 11, 13];
		var paragraphs = d3.select('#sectionOne').selectAll('p')
							.data(data);

		paragraphs.enter()
				.append('p')
				.text(function (d, i) {
					return 'Prime T'+i+':  '+d;
				});
		
	}

	function sectionTwo() {
		var data = [1, 1, 2, 3, 5, 8, 13];
		var paragraphs = d3.select('#sectionTwo').selectAll('p')
							.data(data);

		function updateReadout(newData) {
			var readoutMsg = '['+newData.toString().replace(/,/g, ', ')+']';
			document.querySelector('#lessonTwo .current-data').value = readoutMsg;
		}

		function updateData() {
			var data = [];
			var i;
			var numDataPoints = Math.ceil(Math.random()*10); //Data can contain between 1 and 10 values

			for (i = 0; i < numDataPoints.length; i++) {
				data.push(Math.round(Math.random()*100)); //Data is any integer between 0 and 100
			}

			paragraphs.data(data);
			updateReadout(data);

		}

		paragraphs.enter()
				.append('p')
				.text(function (d, i) {
					return 'Paragraph #'+i+' -- Data: '+d;
				});

		updateReadout(data);

	}

	sectionOne();
	sectionTwo();

});