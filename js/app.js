google.load("feeds", "1");

var lifescriptApp = angular.module("lifescriptApp", ['ui.bootstrap']);

(function() {
	var mainController = function(lifescriptService, feedService) {
		
		var mainCtrlVM = this;
		
		mainCtrlVM.templateBurnItOff = "templates/burnItOff.html";
		mainCtrlVM.templateTotalHealth = "templates/totalHealthCalc.html";
		
		feedService.retrieveJsonFromFile("data/rss_feed_information.json").then(function(data) {
			mainCtrlVM.dropdownRssOptions = data.rssFeedInfo;
		});
		
		mainCtrlVM.formatDate = function(date){
			if(localStorage.getItem("show_publication_date") === null) {
				var dateOut = new Date(date);
				return dateOut;
			}
			return "";
		};
		
		mainCtrlVM.openUrlLink = function(url) {
			lifescriptService.openUrlLink(url);
		};
		
		mainCtrlVM.openSettings = function() {
			lifescriptService.openSettings();
		};
		
		mainCtrlVM.openFaqs = function() {
			lifescriptService.openFaqs();
		};
	};
	
	lifescriptApp.controller("mainController", ['lifescriptService', 'feedService', mainController]);
})();