(function() {
	var lifescriptService = function($http) {				
		var isUndefinedOrNull = function(obj) {
			return !angular.isDefined(obj) || obj===null;
		};
		
		var openUrlLink = function(link) {
			chrome.tabs.create({url: link});
		};
		
		var openSettings = function () {
			var optionsUrl = chrome.extension.getURL('options.html');
			openPageWithUrl(optionsUrl);
		};

		var openFaqs = function () {
			var optionsUrl = chrome.extension.getURL('faqs.html');
			openPageWithUrl(optionsUrl);
		};

		var openPageWithUrl = function ( optionsUrl ) {
			chrome.tabs.query({url: optionsUrl}, function(tabs) {
				if (tabs.length) {
					chrome.tabs.update(tabs[0].id, {active: true});
				} else {
					chrome.tabs.create({url: optionsUrl});
				}
			});
		};
		
		return {
			isUndefinedOrNull: isUndefinedOrNull,
			openUrlLink: openUrlLink,
			openSettings: openSettings,
			openFaqs: openFaqs
		};
		
	};
	
	serviceModule.service("lifescriptService", ['$http', lifescriptService]);
})();