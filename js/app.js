google.load("feeds", "1");

var lifescriptApp = angular.module("lifescriptApp", []);

(function() {
	var mainController = function($scope, $timeout, lifescriptService, feedService) {	
	
		feedService.retrieveJsonFromFile("data/rss_feed_information.json").then(function(data) {
			$scope.dropdownRssOptions = data.rssFeedInfo;
		});
		
		$scope.formatDate = function(date){
			if(localStorage.getItem("show_publication_date") === null) {
				var dateOut = new Date(date);
				return dateOut;
			}
			return "";
		};
		
		$scope.openUrlLink = function(url) {
			lifescriptService.openUrlLink(url);
		};
		
		$scope.openSettings = function() {
			lifescriptService.openSettings();
		};
		
		$scope.openFaqs = function() {
			lifescriptService.openFaqs();
		};
	};
	
	lifescriptApp.controller("mainController", ['$scope', '$timeout', 'lifescriptService', 'feedService', mainController]);
})();