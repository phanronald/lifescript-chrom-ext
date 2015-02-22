google.load("feeds", "1");

var lifescriptApp = angular.module("lifescriptApp", []);

(function() {
	var mainController = function($scope, $timeout, lifescriptService, feedService) {	

		/*youtubeService.retrieveLatestVideos("https://gdata.youtube.com/feeds/api/users/lifescripttv/uploads?v=2&alt=jsonc&max-results=10").then(function(data) {
			//$scope.youtubeTest = data.data.items[0].title;
		});*/
		
		//$scope.dropdownNameSelected = "Choose an RSS Feed";
		
		feedService.retrieveJsonFromFile("data/rss_feed_information.json").then(function(data) {
			$scope.dropdownRssOptions = data.rssFeedInfo;
		});
		
		/*$scope.openFeed = function(dropdownRssOption) {
			$scope.dropdownNameSelected = dropdownRssOption.name;
			$scope.missingFeedInfos = null;
			
			feedService.retrieveFeed(dropdownRssOption.url).then(function(data) {
				$scope.rssContentInfos = data.feed.entries;
			});
			
		};*/
		
		$scope.formatDate = function(date){
			if(localStorage.getItem("show_publication_date") === null) {
				var dateOut = new Date(date);
				return dateOut;
			}
			return "";
		};
		
		/*$scope.openMissingPage = function() {
			$scope.dropdownNameSelected = "Removed Lifescript Pages";
			$scope.rssContentInfos = null;
			
			feedService.retrieveJsonFromFile("data/lifescript_missing_sites.json").then(function(data) {
				$scope.missingFeedInfos = data.misingSites;
			});
		};*/
		
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