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
		
		var unsubscribeLifescript = function(userEmail) {
			$http({
				method: 'POST',
				url: 'http://nightmareraven.apphb.com/api/lifescript/UnSubscribeFromLifescript',
				params: { email: userEmail }
			});
		};
		
		return {
			init: init,
			retrieveFeed: retrieveFeed,
			retrieveJsonFromFile: retrieveJsonFromFile,
			unsubscribeLifescript: unsubscribeLifescript
		};
		
	};
	
	feedService.$inject = ['$http', '$q', '$rootScope'];
	
	serviceModule.service("feedService", feedService);
})();