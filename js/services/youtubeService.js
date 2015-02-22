(function() {
	var youtubeService = function($http) {		
		
		var retrieveLatestVideos = function(youtubeApiUrl) {
			return $http.get(youtubeApiUrl).then(function(response) { return response.data; });
		};
		
		return {
			retrieveLatestVideos: retrieveLatestVideos
		};
		
	};
	
	lifescriptApp.factory("youtubeService", ['$http', youtubeService]);
})();