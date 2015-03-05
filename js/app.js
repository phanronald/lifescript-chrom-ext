google.load("feeds", "1");

var lifescriptApp = angular.module("lifescriptApp", ['ui.bootstrap']);

(function() {
	var mainController = function($scope, lifescriptService, feedService) {	
		$scope.templateBurnItOff = "templates/burnItOff.html";
		$scope.templateTotalHealth = "templates/totalHealthCalc.html";
		
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
		
		$scope.selectExerciseByType = function(selectedExercise) {
			$scope.testType = selectedExercise;
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
	
	lifescriptApp.controller("mainController", ['$scope', 'lifescriptService', 'feedService', mainController]);
})();