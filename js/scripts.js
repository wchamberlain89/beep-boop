function testForChange(num) {
	var splitNumber = num.toString().split('');
	if(splitNumber.includes('3')) {
		return "Blip";
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
	var hexArray = ['#0D1940','#F2B705','#D9C5A0', '#F29F05', '#8C4E03'];
	var randomColor = hexArray[Math.floor(Math.random() * hexArray.length)];

	if(currentIndex < length) {

		$("#" + currentIndex).addClass("animated fadeInUp").css("background-color", randomColor).show();
		var currentDisplayResult = document.getElementById(currentIndex);
		currentDisplayResult.addEventListener("animationend", function() {
			displayNext(currentIndex + 1, length);
		});

	} else {
		
		$(".reset-container").show();

	};

}

function deleteResults(index) {
	$(".reset-container").hide();

	if (index >= 0) {
		$("#" + index).removeClass("fadeInUp");	
		$("#" + index).addClass("fadeOutLeft");
		var currentResult = document.getElementById(index);
		
		currentResult.addEventListener("animationend", function() {
			deleteResults(index - 1);
		});
	} else {
		$("#submit").show();
		$(".result").remove();
	}

}

function restart() {
	deleteResults($(".result").length - 1);
	$("input").val("");
}




$(function(){
	$("button#submit").click(function(){

		var userNumber = $("#user-number").val();
		
		if(userNumber > 0) {
			
			var results = beepBoop(userNumber);

			results.forEach(function(result, index){
				$(".result-container").append("<div class='result col-md-2' id='" + index + "'><span>" + result + "</span></div>");
			});
			
			$("#submit").hide();
			
			displayNext(0, results.length);
		}

	});

	$("button#reset").click(function(){
		$(".reset-container").hide();
		restart();

	});

	$("button#filter").click(function(){
		var filters = []
		$(".result").hide();
		$("input[type='checkbox'][name='filter']:checked").each(function(filter){
			var currentFilter = $(this).val();
			filters.push(currentFilter);
		});
		
		if(filters.length === 0) {
			$(".result").show();
		};

		filters.forEach(function(filter){
			  $(".result:contains('" + filter + "')").show();
		});
	});

});