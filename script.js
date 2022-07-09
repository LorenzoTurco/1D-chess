const tiles = document.querySelectorAll(".chess-board__tile");

const pointers = document.querySelectorAll(".pointer");

// GLOBAL VARIABLES
let gameFinished = false;
let legalMovesDisplayed = false;
let legalMoves = [];
let fromPosition = "";

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
  color: "black",
  move: -1,
};

const chessBoard = {
  board: [
    whiteKing,
    whiteKnight,
    whiteRook,
    "",
    "",
    blackKnight,
    blackKnight,
    blackKing,
  ],
};

/*while (!gameFinished) {
  if (whiteTurn) {
  }
}
*/

const refactorBoard = () => {
  console.log(chessBoard);
};

const makeMove = (event) => {
  //press on brown color not the pointer
  let toPosition = Number(event.target.getAttribute("value"));

  if (legalMoves.includes(toPosition)) {
    chessBoard.board[toPosition] = chessBoard.board[fromPosition];
    chessBoard.board[fromPosition] = "";
  }
  if (colorTurn == "black") colorTurn = "white";
  else colorTurn = "black";
  legalMovesDisplayed = false;
  refactorBoard();
};

const showLegalMoves = (event) => {
  removePointers();
  if (legalMovesDisplayed) {
    makeMove(event);
    return;
  }

  const tilePressed = Number(event.target.getAttribute("value"));
  const tileAttacked = Number(chessBoard.board[tilePressed].move);

  if (chessBoard.board[tilePressed].color != colorTurn) return;

  //CHECK IF ROOK
  if (chessBoard.board[tilePressed].move == -1) {
    console.log("inside1");
    //check forward
    for (let i = 1; i < 9; i++) {
      if (chessBoard.board[tilePressed + i] == "") {
        pointers[tilePressed + i].style.display = "block";

        legalMoves.push(tilePressed + i);
        console.log("inside2");

        continue;
      }

      if (chessBoard.board[tilePressed + i].color != colorTurn) {
        pointers[tilePressed + i].style.display = "block";
        legalMoves.push(tilePressed + i);
        console.log("inside3");
      }
      legalMovesDisplayed = true;

      break;
    }

    //check backwards
    for (let i = 1; i < 9; i++) {
      if (chessBoard.board[tilePressed - i] == "") {
        pointers[tilePressed - i].style.display = "block";
        legalMoves.push(tilePressed - i);

        continue;
      }

      if (chessBoard.board[tilePressed - i].color != colorTurn) {
        pointers[tilePressed - i].style.display = "block";
        legalMoves.push(tilePressed - i);
      }
      legalMovesDisplayed = true;

      break;
    }

    fromPosition = tilePressed;
    return;
  }

  //KING, KNIGHT

  //ATTACK BACKWARDS
  //if can go back enough
  console.log(tilePressed);
  console.log(tileAttacked);

  if (tilePressed - tileAttacked > -1) {
    if (
      chessBoard.board[tilePressed - tileAttacked] == "" ||
      chessBoard.board[tilePressed - tileAttacked].color != colorTurn
    ) {
      pointers[tilePressed - tileAttacked].style.display = "block";
      legalMovesDisplayed = true;

      legalMoves.push(tilePressed - tileAttacked);
      fromPosition = tilePressed;
    }
  }

  //ATTACK FORWARD
  //if can go back enough

  console.log(tilePressed);
  console.log(tileAttacked);

  if (tilePressed + tileAttacked < 8) {
    if (
      chessBoard.board[tilePressed + tileAttacked] == "" ||
      chessBoard.board[tilePressed + tileAttacked].color != colorTurn
    ) {
      pointers[tilePressed + tileAttacked].style.display = "block";
      legalMovesDisplayed = true;
      legalMoves.push(tilePressed + tileAttacked);
      fromPosition = tilePressed;
    }
  }
  return;
};

const removePointers = () => {
  Array.from(pointers).forEach((pointer) => {
    pointer.style.display = "none";
  });
};

Array.from(tiles).forEach((tile) => {
  tile.addEventListener("click", showLegalMoves);
});
