(function() {
	var socialController = function() {
		var socialVM = this;
		socialVM.openSocial = function(socialLink) {
			chrome.tabs.create({url: socialLink});
		};
	};
	
	lifescriptApp.controller("socialController", [socialController]);
})();