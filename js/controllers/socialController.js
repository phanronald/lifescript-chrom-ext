(function() {
	var socialController = function($scope) {		
		$scope.openSocial = function(socialLink) {
			chrome.tabs.create({url: socialLink});
		};
	};
	
	lifescriptApp.controller("socialController", ['$scope', socialController]);
})();