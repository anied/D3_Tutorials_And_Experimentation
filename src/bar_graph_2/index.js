document.addEventListener('DOMContentLoaded', function () {


	var $qs = document.querySelector.bind(document);
	var $qsa = document.querySelectorAll.bind(document);
	var locationButton = $qs('#getWeatherByLocation');
	var zipSubmitButton = $qs('#getWeatherByZip');
	var geolocationAvailable = ("geolocation" in navigator);

	if (geolocationAvailable) {
		$qs('body').className += "geolocation-supported";
	} else {
		$qs('body').className += "geolocation-unsupported";
	}

	function loadWeatherData(data) { //TODO-- everything goes in the one big method to start-- later on it ought to be properly broken out into separate functions for setup, update, etc...
		var datesArr = data.time.startPeriodName;
		var tempsArr = data.data.temperature;
		var dataArr = [];
		var i;

		var height = 600;
		var barHeightMAX = 500;
		var barWidth = 20;
		var barSpacer = 3;

		var calcBarHeight = d3.scale.linear()
									.domain([0, 100])
									.range([0, barHeightMAX]);

		var calcColor = d3.scale.linear()
									.domain([0, 100])
									.rangeRound([0, 255]);

		var barGraph = d3.select('.bar-graph')
							.attr('height', height);

		var bar;

		for (i = 0; i < datesArr.length; i++) {
			dataArr.push({
				label: datesArr[i],
				temp: parseInt(tempsArr[i], 10)
			});
		}

		bar = barGraph.selectAll('g')
				.data(datesArr);

		barGraph.attr('width', (datesArr.length * (barWidth+barSpacer))+'px' );

		bar.exit().remove();

		bar.enter()
				.append('g')
				.attr('transform', function(d, i) { 
					var width = i === 0 ? barSpacer : barSpacer + (barSpacer*i) + (barWidth*i);
					return 'translate(' + width + ',' + barHeightMAX + ')';
				})
					.append('rect')
					.attr('width', barWidth+'px')
					.attr('height', 100+'px');




	}

	function fetchWeather(lat, long) {
		var weatherReq = new XMLHttpRequest();
		weatherReq.onreadystatechange = function () {
			if (weatherReq.readyState === XMLHttpRequest.DONE) {
			    if (weatherReq.status === 200) {
			    	loadWeatherData(JSON.parse(weatherReq.responseText));
				}
				// handle other states
			} else {
			    // handle else
			}
		};
		weatherReq.open('GET', 'http://forecast.weather.gov/MapClick.php?lat=' + lat + '&lon=' + long + '&FcstType=json', true);
		weatherReq.send();
	}

	function fetchCoords(zip) {
		var coordReq = new XMLHttpRequest();
		coordReq.onreadystatechange = function () {
			var location;
			if (coordReq.readyState === XMLHttpRequest.DONE) {
			    if (coordReq.status === 200) {
				    location = JSON.parse(coordReq.responseText).results[0].geometry.location;
				    fetchWeather(location.lat, location.lng);
				}
				// handle other states
			} else {
			    // handle else
			}
		};
		coordReq.open('GET', 'http://maps.googleapis.com/maps/api/geocode/json?address=' + zip, true);
		coordReq.send();
	}

	function getWeatherByLocation() {
		navigator.geolocation.getCurrentPosition(function(position) {
			fetchWeather(position.coords.latitude, position.coords.longitude);
		});
	}

	function getWeatherByZip() {
		var zipcode = $qs('#zipcode').value;
		fetchCoords(zipcode);
	}

	locationButton
		.addEventListener('click', function () {
			getWeatherByLocation();
		});

	zipSubmitButton
		.addEventListener('click', function () {
			getWeatherByZip();
		});

});