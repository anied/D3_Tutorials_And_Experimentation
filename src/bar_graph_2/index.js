document.addEventListener('DOMContentLoaded', function () {


	var $qs = document.querySelector.bind(document);
	var $qsa = document.querySelectorAll.bind(document);
	var locationButton = $qs('#getWeatherByLocation');
	var zipSubmitButton = $qs('#getWeatherByZip');
	var geolocationAvailable = ("geolocation" in navigator);

	if (!geolocationAvailable) {
		$qs('body').className += "geolocation-supported";
	} else {
		$qs('body').className += "geolocation-unsupported";
	}

	locationButton
		.addEventListener('click', function () {
			console.log('GET WEATHER BY LOCATION');
		});

	zipSubmitButton
		.addEventListener('click', function () {
			console.log('GET WEATHER BY ZIP');
		});
});