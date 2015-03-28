google.load("feeds", "1");

var controllerModule = angular.module('app.controllers', []);
var serviceModule = angular.module('app.services', []);
var directiveModule = angular.module('app.directives', []);
var filterModule = angular.module('app.filters', []);
var lifescriptApp = angular.module("lifescriptApp", ['ui.bootstrap', 'app.controllers', 'app.services', 'app.directives', 'app.filters']);

(function() {
	var mainController = function(lifescriptService, feedService) {
		
		var mainCtrlVM = this;
		
		mainCtrlVM.openSettings = function() {
			lifescriptService.openSettings();
		};
		
		mainCtrlVM.openFaqs = function() {
			lifescriptService.openFaqs();
		};
	};
	
	mainController.$inject = ['lifescriptService', 'feedService'];
	
	lifescriptApp.controller("mainController", mainController);
})();