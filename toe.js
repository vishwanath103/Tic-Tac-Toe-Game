var painted = [];
var content = [];
var theCanvas,c,cxt;
var turn = 0;
var squaresFilled;
var winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
$(document).ready(function(){
	for (var i = 0; i < 9; i++) {
		painted[i] = false;
		content[i] = "";
	}		
});

function canvasClicked(num) {
	theCanvas = "canvas" + num;
	c = document.getElementById(theCanvas);

	if(painted[num-1] == false){
		if(turn%2 == 0){
			$('#'+theCanvas).html("X");
			content[num-1] = 'X';
		}
		else{
			$('#'+theCanvas).html("O");
			content[num-1] = 'O';
		}
		turn++;
		painted[num-1] = true;
		squaresFilled++;
		checkForWinners(content[num-1]);
		if(squaresFilled == 9){
			alert("Game Over");
			location.reload();
		}
	}
}

function checkForWinners(symbol) {
	for (var i = 0; i < winningCombinations.length; i++) {
		if(content[winningCombinations[i][0]]==symbol&&content[winningCombinations[i][1]]== symbol&&content[winningCombinations[i][2]]==symbol){
			$('#1').css("")
			//$('#1').css({"position": "relative","margin": "auto","width": "1px","height": "130px","border-left": "1px dotted #ffa"});
        alert(symbol+ " WON!");
        // location.reload();
	}
}
}