(function() {	
	var unsubscribeDirective = function() {
		 return {
			  scope: {},
			  templateUrl: 'templates/unsubscribe.html',
			  replace: true,
			  controller: 'unsubscribeController',
			  controllerAs: 'unsubCtrl'
		};
	};
	
	var unsubscribeController = function(feedService) {
		var unsubVM = this;
		
		unsubVM.unsubscribe = function() {
			feedService.unsubscribeLifescript(unsubVM.emailAddress);
		};
	};
	
	unsubscribeController.$inject = ['feedService'];
	
	directiveModule.directive('unsubscribeDirective', unsubscribeDirective);
	controllerModule.controller("unsubscribeController", unsubscribeController);
})();