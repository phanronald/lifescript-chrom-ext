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
			return $http({
				method: 'GET',
				url: 'http://nightmareraven.apphb.com/api/lifescript/UnSubscribeFromLifescript',
				params: { email: userEmail }
			}).then(function(response) {
				return response;
			});
		};
		
		var subscribeLifescript = function(userEmail, selectedSubcription) {
			return $http({
				method: 'POST',
				url: 'http://nightmareraven.apphb.com/api/lifescript/SubscribeToLifescript',
				data: JSON.stringify({"Email": userEmail, "Subscriptions": selectedSubcription})
			}).then(function(response) {
				return response;
			});
		};
		
		return {
			init: init,
			retrieveFeed: retrieveFeed,
			retrieveJsonFromFile: retrieveJsonFromFile,
			unsubscribeLifescript: unsubscribeLifescript,
			subscribeLifescript: subscribeLifescript
		};
		
	};
	
	feedService.$inject = ['$http', '$q', '$rootScope'];
	
	serviceModule.service("feedService", feedService);
})();