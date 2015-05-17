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
		unsubVM.selectedSubcription =  [];
		
		feedService.retrieveJsonFromFile("data/lifescript_sub.json").then(function(data) {
			unsubVM.subOptions = data.subscriptions;
		});
		
		unsubVM.toggleSubscription = function(subOption) {
			var index = unsubVM.selectedSubcription.indexOf(subOption);
			if(index > -1) {
				unsubVM.selectedSubcription.splice(index, 1);
			}
			else {
				unsubVM.selectedSubcription.push(subOption);
			}
		};
		
		unsubVM.clearAll = function() {
			unsubVM.successUnsub = [];
			unsubVM.successProcess = '';
		};
	};
	
	unsubscribeController.$inject = ['feedService'];
	
	directiveModule.directive('unsubscribeDirective', unsubscribeDirective);
	controllerModule.controller("unsubscribeController", unsubscribeController);
})();