// var painted = [];
// var content = [];
// var theCanvas,c,cxt;
// var turn = 0;
// var squaresFilled;
// var winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
// $(document).ready(function(){
// 	for (var i = 0; i < 9; i++) {
// 		painted[i] = false;
// 		content[i] = "";
// 	}		
// });

// function canvasClicked(num) {
// 	theCanvas = "canvas" + num;
// 	c = document.getElementById(theCanvas);

// 	if(painted[num-1] == false){
// 		if(turn%2 == 0){
// 			$('#'+theCanvas).html("X");
// 			content[num-1] = 'X';
// 		}
// 		else{
// 			$('#'+theCanvas).html("O");
// 			content[num-1] = 'O';
// 		}
// 		turn++;
// 		painted[num-1] = true;
// 		squaresFilled++;
// 		checkForWinners(content[num-1]);
// 		if(squaresFilled == 9){
// 			alert("Game Over");
// 			location.reload();
// 		}
// 	}
// }

// function checkForWinners(symbol) {
// 	for (var i = 0; i < winningCombinations.length; i++) {
// 		if(content[winningCombinations[i][0]]==symbol&&content[winningCombinations[i][1]]== symbol&&content[winningCombinations[i][2]]==symbol){
//         alert(symbol+ " WON!");
//         location.reload();
// 	}
// }
// }

// function compTurn()


//turn=0---> Comp Turn
//turn=1---> Player Turn
var turn=0;
var theCanvas;
var state = [];
var tree = [];
var winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
$(document).ready(function(){
	turn = 1;
	var random = Math.round(Math.random() * 8 + 1);
	state[random] = 'X';
	theCanvas = "canvas" + random;
	$('#'+theCanvas).html("X");
});

function canvasClicked(num) {
	if(turn == 1){
		if(state[num] == null){
			turn = 0;
			theCanvas = "canvas" + num;
	    	$('#'+theCanvas).html("O");
	    	state[num] = 'O';
	    	compTurn();
		}
	}
}

function compTurn(){
	tree = state;
	var arr = miniMax(2,0);
	alert(arr);
	turn = 1;
}

function miniMax(depth,turn){
	var turn = turn;
	var bestScore = (turn === 0)?Math.max():Math.min();
	var currentScore;
	var nextMoves = [];
	var bestMove = -1;
	for (var i = 1; i < 10; i++) {
		if(tree[i]==null)
			nextMoves.push(i);
	}
	if(nextMoves.length<=0 || depth == 0)
		bestScore = evaluate();
	else{
		nextMoves.forEach(function(move){
			tree[move] = (turn == 0)?'X':'O';
			if(turn == 0){  //Computer
				currentScore = miniMax(depth-1,1-turn);
				alert(currentScore);
				if(currentScore>bestScore){
					bestScore = currentScore;
					bestMove = move;
				}
			}
			else{ //Player
				currentScore = miniMax(depth-1,1-turn);
				if(currentScore<bestScore){
					bestScore = currentScore;
					bestMove = move;
				}
			}
		});
	}
	return [bestScore,bestMove];
}

function evaluate() {
	var score = 0;
	score += evaluateLine(1, 2, 3);  // row 1
    score += evaluateLine(4, 5, 6);  // row 2
    score += evaluateLine(7, 8, 9);  // row 3
    score += evaluateLine(1, 4, 7);  // col 1
    score += evaluateLine(2, 5, 8);  // col 2
    score += evaluateLine(3, 6, 9);  // col 3
    score += evaluateLine(1, 5, 9);  // diagonal
    score += evaluateLine(3, 5, 7);  // alternate diagonal
    return score;
}

function evaluateLine(a,b,c) {
	var score = 0;
	//First Cell
	if(tree[a] === 'X')
		score = 1;
	else if(tree[a] === 'O')
		score = -1;

	//Second Cell
	if(tree[b] == 'X'){
		if(score == 1)
			score = 10;
		else if(score == -1)
			return 0;
		else
			score = 1;
	}
	else if(tree[b] === 'O'){
		if(score == -1)
			score = -10;
		else if(score == 1)
			return 0;
		else
			score = -1;
	}

	//Third Cell
	if(tree[c] === 'X'){
		if(score > 0)
			score *= 10;
		else if(score < 0)
			return 0;
		else
			score = 1;
	}
	else if(tree[c] === 'O'){
		if(score < 0)
			score *= 10;
		else if(tree > 0)
			return 0;
		else
			score = -1;
	}
	return score;

}