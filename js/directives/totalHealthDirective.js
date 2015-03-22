(function() {	
	var totalHealthDirective = function(feedService) {
		 return {
			  scope: {},
			  templateUrl: 'templates/totalHealthCalc.html',
			  replace: true,
			  controller: 'totalHealthController',
			  controllerAs: 'healthCalc'
		};
	};
	
	var totalHealthController = function(feedService) {
		
		var totalHealthVM = this;
		
		feedService.retrieveJsonFromFile("data/activity_level.json").then(function(data) {
			totalHealthVM.activityLevels = data.activity_level;
		});
		
		totalHealthVM.totalFitnessCalc = function() {
			totalHealthVM.resultTargetHeartRate = calcTargetHeartRate();
			totalHealthVM.resultBMR = calcBasalMetabolicRate() + " calories burned per day";
			
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
			totalHealthVM.resultBMI = bmiValue + resultText;
			
			totalHealthVM.resultCaloriesNeed = calcCaloriesNeedBurn() + " calories per day";
			totalHealthVM.resultIdealBodyWeight = calcIdealBodyWeight(true) + " pounds (" + calcIdealBodyWeight(false) + " kg)";
			
			var waistToHipValue = calcWaistToHipRation();
			totalHealthVM.resultWaistToHip = waistToHipValue + (waistToHipValue > 0.80 ? " (apple shape)" : " (pear shape)");
			totalHealthVM.showHealthResult = true;
		};
		
		var calcTargetHeartRate = function() {		
			var main_heart = 220 - totalHealthVM.selectedAges - totalHealthVM.selectedHeartRate;	
			var min_intensity = Math.round((main_heart * 0.6) + totalHealthVM.selectedHeartRate);
			var max_intensity = Math.round((main_heart * 0.7) + totalHealthVM.selectedHeartRate);		
			return min_intensity + " to " + max_intensity + " beats per minute";
		};
		
		var calcBasalMetabolicRate = function() {
			var weightInKg = totalHealthVM.selectedWeightLbs / 2.2;
            var heightInCm = ((totalHealthVM.selectedHeightFt * 12) + totalHealthVM.selectedHeightInches) * 2.54;
            var BMRFactor = 0.0;
            if (totalHealthVM.gender == "f") {
                BMRFactor = 655 + (9.6 * weightInKg) + (1.8 * heightInCm) - (4.7 * totalHealthVM.selectedAges);
			}
            else {
                BMRFactor = 66 + (13.7 * weightInKg) + (5 * heightInCm) - (6.8 * totalHealthVM.selectedAges);
			}
			
            return Math.round(BMRFactor);
		};
		
		var calcBMI = function() {
			var heightInInches = ((totalHealthVM.selectedHeightFt * 12) + totalHealthVM.selectedHeightInches);
			return Math.round(totalHealthVM.selectedWeightLbs * 703 * 10 / heightInInches / heightInInches / 10);
		};
		
		var calcCaloriesNeedBurn = function() {
			var weightInKg = totalHealthVM.selectedWeightLbs / 2.2;
            var heightInCm = ((totalHealthVM.selectedHeightFt * 12) + totalHealthVM.selectedHeightInches) * 2.54;
            var BMRFactor = (totalHealthVM.gender == "f" ? 1.0 : 0.9);
            var BMR = ((9.99 * weightInKg) + (6.25 * heightInCm) + (166 * BMRFactor)) - 161;
            var energyNeeded = 0.0;
			var isMale = totalHealthVM.gender == "m" ? true : false;
			switch (totalHealthVM.selectedActivityLevel.id)
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
			var heightInInches = ((totalHealthVM.selectedHeightFt * 12) + totalHealthVM.selectedHeightInches);
            if (heightInInches > 60) {
                heightOverFiveFeet = heightInInches - 60;
			}
			
            return Math.round((2.3 * heightOverFiveFeet) + (totalHealthVM.gender == "f" ? 45.5 : 50) * (isLbs ? 2.2 : 1));
		};
		
		var calcWaistToHipRation = function() {
			return Math.round((totalHealthVM.selectedWaist / totalHealthVM.selectedHips));
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

	directiveModule.directive('totalHealthDirective', [totalHealthDirective]);
	controllerModule.controller("totalHealthController", ['feedService', totalHealthController]);
	filterModule.filter("rangeFilter", [rangeFilter]);
})();