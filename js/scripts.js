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

function displayNext(currentIndex, length, hexArray) {
	
	var randomColor = hexArray[Math.floor(Math.random() * hexArray.length)];

	if(currentIndex < length) {

		$("#" + currentIndex).addClass("animated fadeInUp").css("background-color", randomColor).show();
		var currentDisplayResult = document.getElementById(currentIndex);
		currentDisplayResult.addEventListener("animationend", function() {
			displayNext(currentIndex + 1, length, hexArray);
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
	var currentHex = ['#0D1940','#F2B705','#D9C5A0', '#F29F05', '#8C4E03'];
	

	$("button#submit").click(function(){

		var displayHex = currentHex.slice();
		var userNumber = $("#user-number").val();
		
		if(userNumber > 0) {
			
			var results = beepBoop(userNumber);

			results.forEach(function(result, index){
				$(".result-container").append("<div class='result col-md-2' id='" + index + "'><span>" + result + "</span></div>");
			});
			
			$("#submit").hide();
			
			displayNext(0, results.length, displayHex);
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

	$("#cs1").click(function(){
		$("body").addClass("body-cs1");
		$("h2").addClass("h2-cs1");
		$("#user-number").addClass("user-number-cs1");
		currentHex = ['#393E46','#00ADB5','#FFF4E0','#F8B500','#FC3C3C'];
	});
	$("#cs2").click(function(){
		$("body").removeClass("body-cs1 bodycs3 bodycs4");
		$("body").addClass("body-cs2");
		$("h2").addClass("h2-cs2");
		$("#user-number").addClass("user-number-cs2");
		currentHex = ['#393E46','#00ADB5','#FFF4E0','#F8B500','#FC3C3C'];
	});

});