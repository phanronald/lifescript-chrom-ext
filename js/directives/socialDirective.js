(function() {	
	var socialDirective = function() {
		 return {
			  scope: {},
			  templateUrl: 'templates/socialLinkage.html',
			  replace: true,
			  controller: 'socialController',
			  controllerAs: 'social'
		};
	};
	
	var socialController = function() {
		var socialVM = this;
		socialVM.openSocial = function(socialLink) {
			chrome.tabs.create({url: socialLink});
		};
	};
	
	directiveModule.directive('socialDirective', [socialDirective]);
	controllerModule.controller("socialController", [socialController]);
})();