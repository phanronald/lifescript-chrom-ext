(function() {	
	var LifeScriptDropdownCtrl = function(feedService) {
		var lifescriptDdlVM = this;
		lifescriptDdlVM.openSelectFeed = function(dropdownRssOption) {
			feedService.retrieveFeed(dropdownRssOption.url).then(function(data) {
				lifescriptDdlVM.rssFeedInfo = data.feed.entries;
			});
		};
	};
	
	lifescriptApp.controller('LifeScriptDropdownCtrl', ['feedService', LifeScriptDropdownCtrl]);
})();