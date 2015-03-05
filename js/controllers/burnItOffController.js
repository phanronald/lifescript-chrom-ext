(function() {
	var burnItOffController = function($scope, feedService) {

		feedService.retrieveJsonFromFile("data/burnitoff_information.json").then(function(data) {
			$scope.burnitoff = data;
			$scope.exercise = data;
		});
		
		$scope.burnItOffError = null;
		$scope.minutesToBurnOffFood = null;
	
		$scope.burnItOffCalc = function() {			
			var calories = $scope.selectedFood.value;
			var metabolicEquivalentTask = $scope.selectedExerciseType.value;
			
			$scope.minutesToBurnOffFood = Math.round(calories / (metabolicEquivalentTask * 3.5 * ($scope.selectedWeight / 2.2) / 200) * 10) / 10 + " minutes of " +
				$scope.selectedExerciseType.name + " will burn off an " + $scope.selectedFood.name;
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

	lifescriptApp.controller("burnItOffController", ['$scope', 'feedService', burnItOffController]);
	lifescriptApp.filter("foodExerciseFilter", [foodExerciseTypeFilter]);
})();