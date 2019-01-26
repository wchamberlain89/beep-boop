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
				$(".result-container").append("<div class='result col-md-1' id='" + index + "'><span>" + result + "</span></div>");
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
		$("body").removeClass("body-cs2 body-cs3 body-cs4");
		$("body").addClass("body-cs1");
		$("h2").removeClass("h2-cs2 h2-cs3 h2-cs4");
		$("h2").addClass("h2-cs1");
		$("#user-number").removeClass("user-number-cs2 user-number-cs3 user-number-cs4");
		$("#user-number").addClass("user-number-cs1");
		currentHex = ['#393E46','#00ADB5','#FFF4E0','#F8B500','#FC3C3C'];
	});

	$("#cs2").click(function(){
		$("body").removeClass("body-cs1 body-cs3 body-cs4");
		$("body").addClass("body-cs2");
		$("h2").removeClass("h2-cs1 h2-cs3 body-cs4");
		$("h2").addClass("h2-cs2");
		$("#user-number").removeClass("user-number-cs1 user-number-cs3 user-number-cs4");
		$("#user-number").addClass("user-number-cs2");
		currentHex = ['#6483C2','#ABC093','#735680','#EA989F','#5B7CC3'];
	});

	$("#cs3").click(function(){
		$("body").removeClass("body-cs1 body-cs2 body-cs4");
		$("body").addClass("body-cs3");
		$("h2").removeClass("h2-cs1 h2-cs2 body-cs4");
		$("h2").addClass("h2-cs3");
		$("#user-number").removeClass("user-number-cs1 user-number-cs2 user-number-cs4");
		$("#user-number").addClass("user-number-cs3");
		currentHex = ['#F0CC00','#FF9900','#FF6600','#FF3300','#FF0000'];
	});

	$("#cs4").click(function(){
		$("body").removeClass("body-cs1 body-cs2 body-cs3");
		$("body").addClass("body-cs4");
		$("h2").removeClass("h2-cs1 h2-cs2 body-cs3");
		$("h2").addClass("h2-cs4");
		$("#user-number").removeClass("user-number-cs1 user-number-cs2 user-number-cs3");
		$("#user-number").addClass("user-number-cs4");
		currentHex = ['#D96C80','#D996A7','#F2B6C6','#46518C','#D0D3D9'];
	});
});