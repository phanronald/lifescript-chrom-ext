(function() {
	
	var lifescriptDropdown = function(feedService) {
		return {
			restrict: 'AE',
			scope: {
			  lsOptions: '=options',
			  feedInfo: '='
			},
			templateUrl: 'templates/lsSelect.html',
			link: function($scope, $element, $attrs) {                                       
				$scope.openSelectFeed = function(dropdownRssOption) {
					feedService.retrieveFeed(dropdownRssOption.url).then(function(data) {
						$scope.feedInfo = data.feed.entries;
					});
				}
            }
		};
	};
	
	lifescriptApp.directive("lifescriptDropdown", ['feedService', lifescriptDropdown]);
})();