var url = "http://myanimelist.net/api/anime|manga/search.xml?q="

var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope) {
	$scope.url = "http://myanimelist.net/api/anime|manga/search.xml?q="
	$scope.searchfield = "";
	
	$scope.animesearch = function() {
		for (var i = 0; i < $scope.searchfield.length; i++) {
			if ($scope.searchfield[i] == " ") {
				$scope.url = $scope.url + "+";
			} else {
				$scope.url = $scope.url + $scope.searchfield[i];
			}
		};

		console.log($scope.url);

		//$.get($scope.url, function (data) {
		//	console.log(data);
		//});

		$.ajax({
			url: $scope.url,
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Basic" + btoa("072665995:biostarz77ke"));
			},
			type: 'GET',
			dataType: 'xml',
			processData: false,
			success: function(data) {
				console.log(data);
			},
			error: function() {
				console.log("Cannot get data");
			}
		});
		
		//console.log($scope.url_input); // for debugging purposes
	}
});

if (window.DOMParser) {
	parser = new DOMParser();
	xmlDoc=parser.parseFromString(txt, "text/xml");
} else {
	xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	xmlDoc.async=false;
	xmlDoc.loadXML(txt);
}

// txt in the above is more or less a place holder for what the actual xml file will be
// still need to implement a search bar of some sort that enables you to search for an anime/manga
// still need to 