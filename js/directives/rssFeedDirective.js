(function() {	
	var rssDirective = function() {
		 return {
			  scope: {},
			  templateUrl: 'templates/rssFeed.html',
			  replace: true,
			  controller: 'rssFeedController',
			  controllerAs: 'rssFeedCtrl'
		};
	};
	
	var rssFeedController = function(feedService, lifescriptService) {
		var rssVM = this;
				
		feedService.retrieveJsonFromFile("data/rss_feed_information.json").then(function(data) {
			rssVM.dropdownRssOptions = data.rssFeedInfo;
		});
		
		rssVM.openSelectFeed = function(dropdownRssOption) {
			feedService.retrieveFeed(dropdownRssOption.url).then(function(data) {
				rssVM.rssFeedInfo = data.feed.entries;
			});
		};
		
		rssVM.openUrlLink = function(url) {
			lifescriptService.openUrlLink(url);
		};
		
		rssVM.formatDate = function(date){
			if(localStorage.getItem("show_publication_date") === null) {
				var dateOut = new Date(date);
				return dateOut;
			}
			return "";
		};
	};
	
	rssFeedController.$inject = ['feedService', 'lifescriptService'];
	
	directiveModule.directive('rssDirective', rssDirective);
	controllerModule.controller("rssFeedController", rssFeedController);
})();