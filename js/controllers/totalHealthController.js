(function() {
	var totalHealthController = function($scope, feedService) {
		
		feedService.retrieveJsonFromFile("data/activity_level.json").then(function(data) {
			$scope.activityLevels = data.activity_level;
		});
		
		$scope.totalFitnessCalc = function() {
			$scope.resultTargetHeartRate = calcTargetHeartRate();
			$scope.resultBMR = calcBasalMetabolicRate() + " calories burned per day";
			
			var bmiValue = calcBMI();
			var resultText = "";
			if(bmiValue < 18.5) {
				resultText = " (underweight)";
			}
			else if(bmiValue >= 18.5 && bmiValue <= 24.9) {
				resultText = " (normal weight)";
			}
			else if(bmiValue >= 25 && bmiValue <= 29.9) {
				resultText = " (overweight)";
			}
			else if(bmiValue >= 30) {
				resultText = " (obesity)";
			}
			$scope.resultBMI = bmiValue + resultText;
			
			$scope.resultCaloriesNeed = calcCaloriesNeedBurn() + " calories per day";
			$scope.resultIdealBodyWeight = calcIdealBodyWeight(true) + " pounds (" + calcIdealBodyWeight(false) + " kg)";
			
			var waistToHipValue = calcWaistToHipRation();
			$scope.resultWaistToHip = waistToHipValue + (waistToHipValue > 0.80 ? " (apple shape)" : " (pear shape)");
			$scope.showHealthResult = true;
		};
		
		var calcTargetHeartRate = function() {		
			var main_heart = 220 - $scope.selectedAges - $scope.selectedHeartRate;	
			var min_intensity = Math.round((main_heart * 0.6) + $scope.selectedHeartRate);
			var max_intensity = Math.round((main_heart * 0.7) + $scope.selectedHeartRate);		
			return min_intensity + " to " + max_intensity + " beats per minute";
		};
		
		var calcBasalMetabolicRate = function() {
			var weightInKg = $scope.selectedWeightLbs / 2.2;
            var heightInCm = (($scope.selectedHeightFt * 12) + $scope.selectedHeightInches) * 2.54;
            var BMRFactor = 0.0;
            if ($scope.gender == "f") {
                BMRFactor = 655 + (9.6 * weightInKg) + (1.8 * heightInCm) - (4.7 * $scope.selectedAges);
			}
            else {
                BMRFactor = 66 + (13.7 * weightInKg) + (5 * heightInCm) - (6.8 * $scope.selectedAges);
			}
			
            return Math.round(BMRFactor);
		};
		
		var calcBMI = function() {
			var heightInInches = (($scope.selectedHeightFt * 12) + $scope.selectedHeightInches);
			return Math.round($scope.selectedWeightLbs * 703 * 10 / heightInInches / heightInInches / 10);
		};
		
		var calcCaloriesNeedBurn = function() {
			var weightInKg = $scope.selectedWeightLbs / 2.2;
            var heightInCm = (($scope.selectedHeightFt * 12) + $scope.selectedHeightInches) * 2.54;
            var BMRFactor = ($scope.gender == "f" ? 1.0 : 0.9);
            var BMR = ((9.99 * weightInKg) + (6.25 * heightInCm) + (166 * BMRFactor)) - 161;
            var energyNeeded = 0.0;
			var isMale = $scope.gender == "m" ? true : false;
			switch ($scope.selectedActivityLevel.id)
			{
				case 1:
					energyNeeded = Math.round(weightInKg * (isMale ? 31 : 30));
					break;
				case 2:
					energyNeeded = Math.round(weightInKg * (isMale ? 38: 35));
					break;
				case 3:
					energyNeeded = Math.round(weightInKg * (isMale ? 41: 37));
					break;
				case 4:
					energyNeeded = Math.round(weightInKg * (isMale ? 50: 44));
					break;
				case 5:
					energyNeeded = Math.round(weightInKg * (isMale ? 58 : 51));
					break;
				default:
					energyNeeded = Math.round(weightInKg * (isMale ? 41 : 37));
					break;
			}
            return energyNeeded;
		};
		
		var calcIdealBodyWeight = function(isLbs) {
			var heightOverFiveFeet = 0;
			var heightInInches = (($scope.selectedHeightFt * 12) + $scope.selectedHeightInches);
            if (heightInInches > 60) {
                heightOverFiveFeet = heightInInches - 60;
			}
			
            return Math.round((2.3 * heightOverFiveFeet) + ($scope.gender == "f" ? 45.5 : 50) * (isLbs ? 2.2 : 1));
		};
		
		var calcWaistToHipRation = function() {
			return Math.round(($scope.selectedWaist / $scope.selectedHips));
		};
	};
	
	var rangeFilter = function() {
		return function(input, min, max, inclusive) {
			min = parseInt(min);
			max = parseInt(max) + (inclusive ? 1 : 0);
			for (var i=min; i<max; i++) {
				input.push(i);
			}
			return input;
		};
	};
		
	lifescriptApp.controller("totalHealthController", ['$scope', 'feedService', totalHealthController]);
	lifescriptApp.filter("rangeFilter", [rangeFilter]);
})();