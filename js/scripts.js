function testForChange(num) {
	var splitNumber = num.toString().split('');
	if(splitNumber.includes('3')) {
		return "I'm sorry Dave, I'm afraid I can't do that."
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
	console.log(numberArray);
}





$(function(){
	$("button").click(function(){
		var userNumber = $("#user-number").val();
		result = beepBoop(userNumber);
		beepBoop(userNumber);
	});
});