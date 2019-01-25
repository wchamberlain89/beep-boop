function testForChange(num) {
	var splitNumber = num.toString().split('');
	if(splitNumber.includes('3')) {
		return "I'm sorry Dave, I'm afraid I can't do that";
	} else if(splitNumber.includes('2')) {
		return "Boop";
	} else if(splitNumber.includes('1')) {
		return "Beep";
	} else {
		return num;
	}
}

function beepBoop(numberString) {
	var userNumber = parseInt(numberString);
	var numberArray = [];
	for(i = 0; i <= userNumber; i++) {
		numberArray.push(testForChange(i));
	}
	return numberArray;
}

function displayNext(currentIndex, length) {
	if(currentIndex <= length) {
		$("#" + currentIndex).addClass("animated fadeInUp").show();
		var currentDisplayResult = document.getElementById(currentIndex);
		currentDisplayResult.addEventListener("animationend", function() {
			displayNext(currentIndex + 1, length);

		});
	}
}	

$(function(){
	$("button").click(function(){
		
		var userNumber = $("#user-number").val();
		
		results = beepBoop(userNumber);
		
		results.forEach(function(result, index){
				$(".result-container").append("<div class='result col-md-2' id='" + index + "'><span>" + result + "</span></div>");
		});

		displayNext(0, results.length);

			
		
			
		
		
	});
});