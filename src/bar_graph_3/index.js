document.addEventListener('DOMContentLoaded', function () {


	var $qs = document.querySelector.bind(document);
	var $qsa = document.querySelectorAll.bind(document);
	var locationButton = $qs('#getWeatherByLocation');
	var zipSubmitButton = $qs('#getWeatherByZip');
	var zipInput = $qs('#zipcode');
	var geolocationAvailable = ("geolocation" in navigator);

	var margin = {top: 20, right: 30, bottom: 30, left: 40};
	var height = 450 - margin.top - margin.bottom;
	var width = 770 - margin.left - margin.right;
	var barHeightMAX = 300;
	var maxTemp = 100;

	var calcBarHeight = d3.scale.linear()
								.domain([0, maxTemp])
								.range([0, barHeightMAX]);

	var calcColor = d3.scale.linear()
								.domain([0, maxTemp])
								.rangeRound([0, 255]);

	var x = d3.scale.ordinal()
					.rangeBands([0, width], 0.1);

	var xAxis = d3.svg.axis()
						.scale(x)
						.orient('bottom');

	var yAxis = d3.svg.axis()
						.scale(calcBarHeight)
						.orient('left');


	var barGraph = d3.select('.bar-graph')
						.attr('height', height + margin.top + margin.bottom)
						.attr('width', width + margin.left + margin.right)
							.append('g')
							.attr('transform', 'translate('+margin.left+','+margin.top+')');


	function loadWeatherData(data) {
		//TODO-- everything goes in the one big method to start-- later on it ought to be properly broken out into separate functions for setup, update, etc...
		//TODO-- seperate attr methods are a little messy-- one big object (or even a function returning the various objects) would probably be cleaner
		//TODO-- error handling, waiting indicators while retreiving data or getting location
		//TODO-- make it look nice

		var datesArr = data.time.startPeriodName;
		var tempsArr = data.data.temperature;
		var dataArr = [];
		var i;

		var bar;

		function generateRGB(datum) {
			return 'rgb(' + calcColor(datum) + ',0,' + (255-calcColor(datum)) + ')';
		}

		function update() {

			x.domain(dataArr.map(function (d) {
				return d.label;
			}));


			barGraph.append("g")
			    .attr("class", "x axis")
			    .attr("transform", "translate(0," + height + ")")
			    .call(xAxis);

			barGraph.append("g")
			    .attr("class", "y axis")
			    .call(yAxis);


			bar = barGraph.selectAll('g.bar-wrap')
					.data(dataArr);

			bar.exit().remove();

			bar.enter()
					.append('g')
					.attr('class', '.bar-wrap')
					.attr('transform', function(d, i) {
						return 'translate(' + x(d.label) + ',' + (barHeightMAX-calcBarHeight(d.temp)) + ')';
					})
						.append('rect')
						.attr('width', x.rangeBand() + 'px')
						.attr('y', function (d, i) {
							return calcBarHeight(d.temp)+'px';
						})
						.attr('height', '0px');


			bar.select('rect')
				.transition().duration(500)
				.attr('y', 0)
				.attr({
					'height' : function (d, i) {
						return calcBarHeight(d.temp)+'px';
					},
					'fill' : function (d, i) {
						return generateRGB(d.temp);
					}
				}).each('end', function (d, i) {
					d3.select(this.parentNode)
						.append('text')
						.attr({
							'x': function (d, y) {
								return x.rangeBand() / 2; 
							},
							'y': 20
						})
						.text(function (d, y) {
							return d.temp;
						});
				});
		}



		for (i = 0; i < datesArr.length; i++) {
			dataArr.push({
				label: datesArr[i],
				temp: parseInt(tempsArr[i], 10)
			});
		}

		zeroData(update); // pass in update as callback

	}

	function zeroData(callback) {

		var bar = d3.select('.bar-graph').selectAll('.bar-wrap');

		var barLength = bar[0].length;
		var n = 0;

		bar = bar.data([]);

		if (n === barLength) {
			callback();
		} else {

			bar.exit().selectAll('text').remove();

			bar.exit()
				.transition().duration(500)
				.attr('transform', function(d, i) { 
					return 'translate(' + x(d.label) + ',' + (barHeightMAX-calcBarHeight(maxTemp)) + ')';
				}).each('start', function () {
					d3.select(this)
						.select('rect')
							.transition().duration(500)
							.attr({
								'y': function (d, i) {
									return calcBarHeight(maxTemp)+'px';
								},
								'height': '0px'
							}).each('end', function () {
								n++;
								this.parentNode.remove();
								if (n === barLength) {
									callback();
								}
							});			
				});
		}

	
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


	if (geolocationAvailable) {
		$qs('body').className += "geolocation-supported";
	} else {
		$qs('body').className += "geolocation-unsupported";
	}


	locationButton
		.addEventListener('click', function () {
			getWeatherByLocation();
		});

	zipSubmitButton
		.addEventListener('click', function () {
			getWeatherByZip();
		});

	zipInput // pretty silly-- probably should've just made a properly defined form...
		.addEventListener('keydown', function (evt) {
			if (evt.keyCode === 13) {
				evt.preventDefault();
				zipSubmitButton.focus();
				getWeatherByZip();
			}
		});

});