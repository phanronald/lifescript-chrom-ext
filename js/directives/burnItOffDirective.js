(function() {	
	var burnItOffDirective = function(feedService) {
		 return {
			  scope: {},
			  templateUrl: 'templates/burnItOff.html',
			  replace: true,
			  controller: 'burnItOffController',
			  controllerAs: 'burnIt'
		};
	};
	
	var burnItOffController = function(feedService) {
		var burnItOffVM = this;

		feedService.retrieveJsonFromFile("data/burnitoff_information.json").then(function(data) {
			burnItOffVM.burnitoff = data;
			burnItOffVM.exercise = data;
		});
		
		burnItOffVM.burnItOffError = null;
		burnItOffVM.minutesToBurnOffFood = null;
	
		burnItOffVM.burnItOffCalc = function() {			
			var calories = burnItOffVM.selectedFood.value;
			var metabolicEquivalentTask = burnItOffVM.selectedExerciseType.value;
			
			burnItOffVM.minutesToBurnOffFood = Math.round(calories / (metabolicEquivalentTask * 3.5 * (burnItOffVM.selectedWeight / 2.2) / 200) * 10) / 10 + " minutes of " +
				burnItOffVM.selectedExerciseType.name + " will burn off an " + burnItOffVM.selectedFood.name;
		};
	};
	
	var foodExerciseTypeFilter = function() {
		return function (exerciseTypes, selectedExercise) {
			if (!angular.isUndefined(exerciseTypes) && !angular.isUndefined(selectedExercise)) {
				var tempExerciseTypes = [];
				angular.forEach(selectedExercise, function (id) {
					angular.forEach(exerciseTypes, function (client) {
						if (angular.equals(client.parent, id)) {
							tempExerciseTypes.push(client);
						}
					});
				});
				return tempExerciseTypes;
			} else {
				return exerciseTypes;
			}
		};
	};

	burnItOffController.$inject = ['feedService'];
	
	directiveModule.directive('burnItOffDirective', burnItOffDirective);
	controllerModule.controller("burnItOffController", burnItOffController);
	filterModule.filter("foodExerciseFilter", foodExerciseTypeFilter);	
})();