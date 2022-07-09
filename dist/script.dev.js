"use strict";

var tiles = document.querySelectorAll(".chess-board__tile");
var pointers = document.querySelectorAll(".pointer"); // GLOBAL VARIABLES

var gameFinished = false;
var legalMovesDisplayed = false;
var legalMoves = [];
var startingPosition = ""; //Who's turn

var colorTurn = "white"; //PIECES
//kings

var whiteKing = {
  color: "white",
  move: 1
};
var blackKing = {
  color: "black",
  move: 1
}; //knigths

var whiteKnight = {
  color: "white",
  move: 2
};
var blackKnight = {
  color: "black",
  move: 2
}; //roocks

var whiteRook = {
  color: "white",
  move: -1
};
var blackRook = {
  color: "black",
  move: -1
};
var chessBoard = {
  board: [whiteKing, whiteKnight, whiteRook, "", "", blackRook, blackKnight, blackKing]
};
/*while (!gameFinished) {
  if (whiteTurn) {
  }
}
*/

var refactorBoard = function refactorBoard() {
  console.log(chessBoard);
};

var makeMove = function makeMove(event) {
  var tilePressed = Number(event.target.getAttribute("value"));
  console.log(tilePressed);
  console.log(legalMoves);

  if (legalMoves.includes(tilePressed)) {
    console.log("hell");
    chessBoard.board[tilePressed] = chessBoard.board[startingPosition];
    chessBoard.board[startingPosition] = "";
  }

  refactorBoard();
};

var showLegalMoves = function showLegalMoves(event) {
  removePointers();

  if (legalMovesDisplayed) {
    makeMove(event);
  }

  var tilePressed = Number(event.target.getAttribute("value"));
  var tileAttacked = Number(chessBoard.board[tilePressed].move);
  if (chessBoard.board[tilePressed].color != colorTurn) return; //CHECK IF ROOK

  if (chessBoard.board[tilePressed].move == -1) {
    //check forward
    for (var i = 1; i < 9; i++) {
      if (chessBoard.board[Number(tilePressed) + i] == "") {
        tiles[tilePressed + i].querySelector(".pointer").style.display = "block";
        legalMoves.push(tilePressed + i);
        startingPosition = tilePressed;
        continue;
      }

      if (chessBoard.board[tilePressed + i].color != colorTurn) {
        tiles[tilePressed + i].querySelector(".pointer").style.display = "block";
        legalMoves.push(tilePressed + i);
        startingPosition = tilePressed;
      }

      legalMovesDisplayed = true;
      break;
    } //check backwards


    for (var _i = 1; _i < 9; _i++) {
      if (chessBoard.board[Number(tilePressed) - _i] == "") {
        tiles[Number(tilePressed) - _i].querySelector(".pointer").style.display = "block";
        legalMoves.push(tilePressed - _i);
        startingPosition = tilePressed;
        continue;
      }

      if (chessBoard.board[Number(tilePressed) - _i].color != colorTurn) {
        tiles[Number(tilePressed) - _i].querySelector(".pointer").style.display = "block";
        legalMoves.push(tilePressed - _i);
        startingPosition = tilePressed;
      }

      legalMovesDisplayed = true;
      break;
    }

    return;
  } //KING, KNIGHT
  //ATTACK BACKWARDS
  //if can go back enough


  if (tilePressed - tileAttacked > -1) {
    if (chessBoard.board[tilePressed - tileAttacked] == "" || chessBoard.board[tilePressed - tileAttacked].color != colorTurn) {
      tiles[tilePressed - tileAttacked].querySelector(".pointer").style.display = "block";
      legalMovesDisplayed = true;
      legalMoves.push(tilePressed - tileAttacked);
      startingPosition = tilePressed;
      return;
    }
  } //ATTACK FORWARD
  //if can go back enough


  if (tilePressed + tileAttacked < 8) {
    if (chessBoard.board[tilePressed + tileAttacked] == "" || chessBoard.board[tilePressed + tileAttacked].color != colorTurn) {
      tiles[tilePressed + tileAttacked].querySelector(".pointer").style.display = "block";
      legalMovesDisplayed = true;
      legalMoves.push(tilePressed + tileAttacked);
      startingPosition = tilePressed;
      return;
    }

    return;
  }
};

var removePointers = function removePointers() {
  Array.from(pointers).forEach(function (pointer) {
    pointer.style.display = "none";
  });
};

Array.from(tiles).forEach(function (tile) {
  tile.addEventListener("click", showLegalMoves);
});