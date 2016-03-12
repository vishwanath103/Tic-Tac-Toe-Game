
//turn=0---> Comp Turn
//turn=1---> Player Turn
var turn=0;
var theCanvas;
var state = new Array(10);
var tree = [];
var winningCombinations = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
var squaresFilled = 0;
var status = 0;
$(document).ready(function(){
	turn = 1;
	var random = Math.round(Math.random() * 8 + 1);
	state[random] = 'X';
	theCanvas = "canvas" + random;
	$('#'+theCanvas).html("X");
	squaresFilled++;
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
	squaresFilled++;
	var status = hasWon('O');
	// if(status === 0){
	// 	if(squaresFilled == 9){
	// 	alert(status);
	// 	location.reload();
	// 	}
	// }
}

function compTurn(){
	tree = state;
	var arr = miniMax(2,0);
	theCanvas = "canvas" + arr[1];
	$('#'+theCanvas).html("X");
	state[arr[1]] = "X";
	turn = 1;
	squaresFilled++;
	var status = hasWon('X');
	// if(status === 0){
	// 	if(squaresFilled == 9){
	// 	alert(status);
	// 	location.reload();
	// 	}
	// }
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
				currentScore = miniMax(depth-1,1-turn)[0];
				if(currentScore>bestScore){
					bestScore = currentScore;
					bestMove = move;
				}
			}
			else{ //Player
				currentScore = miniMax(depth-1,1-turn)[0];
				if(currentScore<bestScore){
					bestScore = currentScore;
					bestMove = move;
				}
			}
			tree[move] = null;
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

function hasWon(symbol) {
	for (var i = 0; i < winningCombinations.length; i++) {
	if(state[winningCombinations[i][0]]==symbol&&state[winningCombinations[i][1]]== symbol&&state[winningCombinations[i][2]]==symbol){
        status = 1;
        $('#status').html(symbol+" WON");
        $("#myModal").modal('show');
        return 1;
 	}
 }
 if(status == 0 && squaresFilled == 9 ){
 	$('#status').html("Draw");
    $("#myModal").modal('show');
 }
}

function playAgain(){
	location.reload();
}