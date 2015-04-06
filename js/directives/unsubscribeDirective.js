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
		
		unsubVM.unsubscribe = function() {
			feedService.unsubscribeLifescript(unsubVM.emailAddress).then(function(data) {
				if(data.data == 200) {
					unsubVM.successProcess = 'You have been unsubscribed from Lifescript.';
				}
				else {
					unsubVM.successProcess = 'There was an issue with the unsubscription process.';
				}
			});
		};
		
		unsubVM.subscribe = function() {
			feedService.subscribeLifescript(unsubVM.emailAddress, unsubVM.selectedSubcription).then(function(data) {
				if(data.data == 200) {
					unsubVM.successProcess = 'You have subscribed to Lifescript.';
				}
				else {
					unsubVM.successProcess = 'There was an issue with the subscription process.';
				}
			});
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