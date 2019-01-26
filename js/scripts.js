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

function swapPalette(colorId) {
		$("body").removeClass();
		$("body").addClass("body-" + colorId);
		$("h2").removeClass();
		$("h2").addClass("h2-" + colorId);
		$("#user-number").removeClass();
		$("#user-number").addClass("user-number-" + colorId );
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
			$("input").val("");
	});

	$("button#clear").click(function(){
		$(".reset-container").hide();
		$("#submit").show();
		$(".result").remove();
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
		swapPalette($(this).attr("id"));
		currentHex = ['#393E46','#00ADB5','#FFF4E0','#F8B500','#FC3C3C'];
	});

	$("#cs2").click(function(){
		swapPalette($(this).attr("id"));
		currentHex = ['#6483C2','#ABC093','#735680','#EA989F','#5B7CC3'];
	});

	$("#cs3").click(function(){
		swapPalette($(this).attr("id"));
		currentHex = ['#DB2B30','#8F1D2C','#5A142A','#400D2A','#140A25'];
	});

	$("#cs4").click(function(){
		swapPalette($(this).attr("id"));
		currentHex = ['#D96C80','#D996A7','#F2B6C6','#46518C','#D0D3D9'];
	});
	$("#cs5").click(function(){
		swapPalette($(this).attr("id"));
		currentHex = ['#003840','#005A5B','#007369','#008C72','#02A676'];
	});
	$("#cs6").click(function(){
		swapPalette($(this).attr("id"));
		currentHex = ['#FF58AF','#70ABB2','#34E8FF','#CCC371','#BA8B0D'];
	});
});