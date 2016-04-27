var app = angular.module('healthApp', ['n3-line-chart']);

app.controller('healthCtrl', function ($scope, $http, $window) {

	$scope.url = "https://api.fitbit.com/1/user/-/";

	$scope.base_date = "";
	$scope.end_date = "";

	var clientid ="";
	var website = "";

	// switch statement to display which month
	function monthswitch (month_value) {
		switch (month_value) {
			case "01":
				return "January";
				break;
			case "02":
				return "February";
				break;
			case "03":
				return "March";
				break;
			case "04":
				return "April";
				break;
			case "05":
				return "May";
				break;
			case "06":
				return "June";
				break;
			case "07":
				return "July";
				break;
			case "08":
				return "August";
				break;
			case "09":
				return "September";
				break;
			case "10":
				return "October";
				break;
			case "11":
				return "November";
				break;
			case "12":
				return "December";
				break;
			default:
				return false
		};
	};

	$scope.infosubmit = function () {

		// display the dates after form submission
		$scope.basearray = $scope.base_date.split("-");
		if (!monthswitch($scope.basearray[1])) {
			window.alert("Month does not exist. Enter the date again.");
			return
		} else {
			$scope.basedate_format = monthswitch($scope.basearray[1]) + " " + $scope.basearray[2] + ", " + $scope.basearray[0];
		}

		$scope.endarray = $scope.end_date.split("-");
		if (!monthswitch($scope.endarray[1])) {
			window.alert("Month does not exist. Enter the date again.");
			return
		} else {
			$scope.enddate_format = monthswitch($scope.endarray[1]) + " " + $scope.endarray[2] + ", " + $scope.endarray[0];
		}

		// get authorization code
		var url = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=" + clientid +
			"&redirect_uri=http%3A%2F%2F" + website + "%2Ffitbit_auth&scope=activity%20heartrate&expires_in=2592000";
		console.log(url);
		$window.location.assign(url);
		// find a way to listen to server response. Gets the access token and uses regex to get acces token from url
		var url_check = $window.location.href,
			access_token = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
		// check the access token to see what it is
		console.log(access_token);

		// make the URL for accessing Fitbit data
		// 100% positive there's a better way to create the URL but use this for now
		$scope.url = $scope.url + "/activities/heart/date/" + $scope.base_date + "/" + $scope.end_date + ".json";
		console.log($scope.url); // for debugging purposes

		// test GET request. Once clientID and authentication is finished, this should work.
		$http ({
			method: 'GET',
			url: $scope.url,
			headers: {
				// Append access token to authorization header
				Authorization: "Bearer" + access_token
			}
		}).then(function(response) {
			$scope.date = response.data.activities-heart.dateTime;
			$scope.data = response.data.activities-heart.value.heartRateZones;
		});

		// reset the fields
		$scope.userid = "";
		$scope.base_date = "";
		$scope.end_date = "";

		//https://n3-charts.github.io/line-chart/#/home for line graphs on the data received from Fitbit API

	};
});
	
