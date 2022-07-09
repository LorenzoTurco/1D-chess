const tiles = document.querySelectorAll(".chess-board__tile");
console.log(tiles);

// GLOBAL VARIABLES
let gameFinished = false;

//Who's turn
let colorTurn = "white";

//PIECES

//kings
const whiteKing = {
  color: "white",
  move: 1,
};

const blackKing = {
  color: "black",
  move: 1,
};

//knigths
const whiteKnight = {
  color: "white",
  move: 2,
};
const blackKnight = {
  color: "black",
  move: 2,
};

//roocks
const whiteRook = {
  color: "white",
  move: -1,
};
const blackRook = {
  color: "Black",
  move: -1,
};

const chessBoard = {
  board: [
    whiteKing,
    whiteKnight,
    whiteRook,
    null,
    null,
    blackRook,
    blackKnight,
    blackKing,
  ],
};

/*while (!gameFinished) {
  if (whiteTurn) {
  }
}
*/

const showLegalMoves = (event) => {
  const tilePressed = event.target.getAttribute("value");
  const tileAttacked = chessBoard.board[tilePressed].move;

  if (chessBoard.board[tilePressed].color != colorTurn) return;

  //CHECK IF ROOK
  if (chessBoard.board[tilePressed].move == -1) {
    //check forward
    for (let i = 1; i < 9; i++) {
      if (chessBoard.board[Number(tilePressed) + i] == null) {
        tiles[Number(tilePressed) + i].querySelector(".pointer").style.display =
          "block";
        //Add pointer
        continue;
      }

      if (chessBoard.board[Number(tilePressed) + i].color != colorTurn) {
        //add pointer
        tiles[Number(tilePressed) + i].querySelector(".pointer").style.display =
          "block";
        break;
      }
    }

    //check backwards
    for (let i = 1; i < 9; i++) {
      if (chessBoard.board[Number(tilePressed) - i] == null) {
        //Add pointer
        continue;
      }

      if (chessBoard.board[Number(tilePressed) - i].color != colorTurn) {
        //add pointer
        break;
      }
    }

    return;
  }

  //KING, KNIGHT

  //ATTACK BACKWARDS
  if (tilePressed - tileAttacked > 1) {
    //if can go back enough
    if (
      chessBoard.board[Number(tilePressed) - Number(tileAttacked)].color !=
      colorTurn
    ) {
      //if the piece you can attack is not your own
      //show legal moves
      //console.log(tiles[tilePressed - tileAttacked]);
    }
  }

  //ATTACK FORWARD
  if (tilePressed + tileAttacked < 8) {
    //if can go back enough

    if (
      chessBoard.board[Number(tilePressed) + Number(tileAttacked)].color !=
      colorTurn
    ) {
      //if the piece you can attack is not your own
      //show legal moves
    }
  }
};

Array.from(tiles).forEach((tile) => {
  tile.addEventListener("click", showLegalMoves);
});
