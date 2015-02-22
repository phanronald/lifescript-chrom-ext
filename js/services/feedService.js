(function() {
	var feedService = function($http, $q, $rootScope) {			
		var init = function() {
			google.load("feeds", "1");
		};
	
		var retrieveJsonFromFile = function(jsonFileName) {
			return $http.get(jsonFileName).then(function(response) { return response.data; });
		};
		
		var retrieveFeed = function(feedUrl) {			
			var deferFeed = $q.defer();
			var feed = new google.feeds.Feed(feedUrl);
			feed.setNumEntries(10);
			feed.load(function(result) {
				$rootScope.$apply(deferFeed.resolve(result));
			});
			
			return deferFeed.promise;
		};
		
		return {
			init: init,
			retrieveFeed: retrieveFeed,
			retrieveJsonFromFile: retrieveJsonFromFile
		};
		
	};
	
	lifescriptApp.factory("feedService", ['$http', '$q', '$rootScope', feedService]);
})();