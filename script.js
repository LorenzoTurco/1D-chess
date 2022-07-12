const tiles = document.querySelectorAll(".chess-board__tile");

const pointers = document.querySelectorAll(".pointer");

// GLOBAL VARIABLES
let gameFinished = false;
let legalMovesDisplayed = false;
let legalMoves = [];
let fromPosition = "";
let isInCheck = false;
let tilesInCheck = [];

//Who's turn
let colorTurn = "white";

//PIECES

//kings
const whiteKing = {
  color: "white",
  move: 1,
  name: "king",
};

const blackKing = {
  color: "black",
  move: 1,
  name: "king",
};

//knigths
const whiteKnight = {
  color: "white",
  move: 2,
  name: "knight",
};
const blackKnight = {
  color: "black",
  move: 2,
  name: "knight",
};

//roocks
const whiteRook = {
  color: "white",
  move: -1,
  name: "rook",
};
const blackRook = {
  color: "black",
  move: -1,
  name: "rook",
};

const chessBoard = {
  board: [
    whiteKing,
    whiteKnight,
    whiteRook,
    "",
    "",
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

const removePointers = () => {
  Array.from(pointers).forEach((pointer) => {
    pointer.style.display = "none";
  });
};

const updateBoardArray = (fromPosition, toPosition) => {
  chessBoard.board[toPosition] = chessBoard.board[fromPosition];
  chessBoard.board[fromPosition] = "";
};

const updateIcons = (fromPosition, toPosition) => {
  tiles[toPosition].querySelector(".chess-icon").src =
    tiles[fromPosition].querySelector(".chess-icon").src;

  tiles[fromPosition].querySelector(".chess-icon").src = "";
};

const changeTurn = () => {
  colorTurn == "black" ? (colorTurn = "white") : (colorTurn = "black");
  legalMovesDisplayed = false;
  legalMoves = [];
};

const CheckMate = () => {
  console.log("CHECKMATE!!!");
};

const checkIfCheckMate = () => {
  //if you can eat the piece -> NOT checkmate
  //if nothing left or right -> checkmate
  //if only ally pieces next to you (stuck) -> checkmate

  console.log(tilesInCheck);

  let kingPosition = 0;

  for (let i = 0; i < chessBoard.board.length; i++) {
    //find king position

    if (
      chessBoard.board[i].name == "king" &&
      chessBoard.board[i].color == colorTurn
    ) {
      kingPosition = i;
      break;
    }
  }

  if (tilesInCheck.includes(kingPosition + 1, kingPosition - 1)) {
    CheckMate();
    return;
  }

  if (chessBoard.board[kingPosition + 1] == undefined) {
    if (tilesInCheck.includes(kingPosition - 1)) {
      CheckMate();
      return;
    }
  }

  if (chessBoard.board[kingPosition - 1] == undefined) {
    if (tilesInCheck.includes(kingPosition + 1)) {
      CheckMate();
      return;
    }
  }
  console.log("THERE MIGHT BE STILL A CHANCE");
  return;
};

const makeMove = (event) => {
  //press on brown color not the pointer
  let toPosition = Number(event.target.getAttribute("value"));

  if (legalMoves.includes(toPosition)) {
    updateBoardArray(fromPosition, toPosition);
    updateIcons(fromPosition, toPosition);

    changeTurn();

    if (isChecked()) {
      checkIfCheckMate();
    }
  } else {
    console.log("move not allowed");
    removePointers();
    legalMoves = [];
    legalMovesDisplayed = false;
  }
  return;
};

const isChecked = () => {
  //CHECK IF YOUR KING IS IN CHECK
  //Find your king
  let kingPosition = 0;

  for (let i = 0; i < chessBoard.board.length; i++) {
    //find king position

    if (
      chessBoard.board[i].name == "king" &&
      chessBoard.board[i].color == colorTurn
    ) {
      kingPosition = i;
      break;
    }
  }

  //find if opponent pieces are puttin your king in check
  //Find all possible moves

  for (let i = 0; i < chessBoard.board.length; i++) {
    if (chessBoard.board[i] == "") continue;
    if (chessBoard.board[i].color == colorTurn) continue; //ignore your own pieces

    //ONLY ENEMY PIECES GET CHECCKED PAST HERE

    switch (chessBoard.board[i].name) {
      case "knight":
        if (
          i + chessBoard.board[i].move == kingPosition ||
          i - chessBoard.board[i].move == kingPosition
        ) {
          isInCheck = true;
          tilesInCheck.push(i + chessBoard.board[i].move);
          tilesInCheck.push(i - chessBoard.board[i].move);
          console.log("CHECK");

          break;
        }
        break;

      case "rook":
        //check left side

        for (let j = 1; j <= i; j++) {
          if (chessBoard.board[i - j] == "") continue;

          if (chessBoard.board[i - j].color == chessBoard.board[i].color) break;

          if (i - j == kingPosition) {
            //is in check
            console.log("CHECK");

            for (let k = 1; k <= j; k++) {
              if (i - k == i) continue;

              tilesInCheck.push(i - k);
            }

            //get checked tiles behind the king/*
            if (chessBoard.board[kingPosition - 1] == "") {
              for (let k = kingPosition; k > -1; k--) {
                if (chessBoard.board[kingPosition - k] == "") {
                  tilesInCheck.push(kingPosition - k);
                }
              }
            }

            isInCheck = true;
          }
          break;
        }

        for (let j = i; j < chessBoard.board.length - 1; j++) {
          if (chessBoard.board[j + 1] == "") continue;

          if (chessBoard.board[j + 1].color == chessBoard.board[i].color) break;

          if (j + 1 == kingPosition) {
            //is in check

            chessBoard.board[j];
            for (let x = 1; x <= j; x++) {
              if (x + 1 == i) continue;

              tilesInCheck.push(x + 1);
            }
            //get checked tiles behind the king

            if (chessBoard.board[kingPosition + 1] == "") {
              console.log("inside");
              for (let k = 1; k < 8; k++) {
                if (chessBoard.board[kingPosition + k] == "") {
                  tilesInCheck.push(kingPosition + k);
                }
              }
            }
            console.log("CHECK");
            isInCheck = true;
          }
          break;
        }
        break;
      case "king":
        break;
    }
  }

  return isInCheck;
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
    //check forward
    for (let i = 1; i < 9; i++) {
      if (chessBoard.board[tilePressed + i] == "") {
        pointers[tilePressed + i].style.display = "block";

        legalMoves.push(tilePressed + i);

        continue;
      }

      if (chessBoard.board[tilePressed + i].color != colorTurn) {
        pointers[tilePressed + i].style.display = "block";
        legalMoves.push(tilePressed + i);
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

Array.from(tiles).forEach((tile) => {
  tile.addEventListener("click", showLegalMoves);
});
