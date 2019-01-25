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





$(function(){
	$("button").click(function(){
		var userNumber = $("#user-number").val();
		results = beepBoop(userNumber);
		results.forEach(function(result){
			$(".result-container").append("<div class='result'><span>" + result + "</span></div>");
		});
		$(".result").addClass("col-md-2 m-2");
	});
});