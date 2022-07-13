const tiles = document.querySelectorAll(".chess-board__tile");

const pointers = document.querySelectorAll(".pointer");

// GLOBAL VARIABLES
let gameFinished = false;
let legalMovesDisplayed = false;
let legalMoves = [];
let fromPosition = "";
let isInCheck = false;
let tilesInCheck = [];
let checkerPiecePosition = "";
let inCheckLegalMoves = [];
let tempChessBoard;

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
  editResultLabel("CHECKMATE");
  gameFinished = true;
};

const checkIfCheckMate = () => {
  //if you can eat the piece -> NOT checkmate
  //if nothing left or right -> checkmate
  //if only ally pieces next to you (stuck) -> checkmate

  console.log(tilesInCheck);
  inCheckLegalMoves = [];
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

  //CHECK IF KING CAN ESCAPE CHECK

  if (!tilesInCheck.includes(kingPosition + 1)) {
    if (chessBoard.board[kingPosition + 1] != undefined) {
      if (chessBoard.board[kingPosition + 1].color != colorTurn) {
        inCheckLegalMoves.push(["king", kingPosition + 1]);
        console.log("king move away from check");
      }
    }
  }
  if (!tilesInCheck.includes(kingPosition - 1)) {
    if (chessBoard.board[kingPosition - 1] != undefined) {
      if (chessBoard.board[kingPosition - 1].color != colorTurn) {
        inCheckLegalMoves.push(["king", kingPosition - 1]);
        console.log("king move away from check");
      }
    }
  }
  console.log(tilesInCheck);

  //CHECK IF YOU CAN USE A KNIGHT TO BLOCK or EAT THE CHECK

  //knight can't block other knights

  let knightPosition = undefined; //CHANGE TO SOMETHING THAT ISNT A NUMBER E.G. NAN/undefined

  for (let i = 0; i < chessBoard.board.length; i++) {
    //find knight position

    if (
      chessBoard.board[i].name == "knight" &&
      chessBoard.board[i].color == colorTurn
    ) {
      knightPosition = i;
      break;
    }
  }

  let x;
  let y;
  if (knightPosition != undefined) {
    //check if knight can cover one of the checked tiles

    x = knightPosition + chessBoard.board[knightPosition].move;
    y = knightPosition - chessBoard.board[knightPosition].move;

    console.log(x);
    console.log(y);
    console.log(tilesInCheck.includes(x));
    console.log(tilesInCheck.includes(y));

    //check if knight can eat piece

    if (x == checkerPiecePosition) {
      console.log(
        "there is still a legal move to eat the piece putting you in check"
      );

      inCheckLegalMoves.push(["knight", x]);
    }

    if (y == checkerPiecePosition) {
      console.log(
        "there is still a legal move to eat the piece putting you in check"
      );

      inCheckLegalMoves.push(["knight", y]);
    }
  }

  if (chessBoard.board[checkerPiecePosition].name == "rook") {
    //check if knight can block check
    //ignore if knight can block the kingPosition
    if (x == kingPosition || y == kingPosition) {
    } else if (tilesInCheck.includes(x)) {
      console.log(
        "there is still a legal move for the knight to stop the check"
      );
      inCheckLegalMoves.push(["knight", x]);
    } else if (tilesInCheck.includes(y)) {
      console.log(
        "there is still a legal move for the knight to stop the check"
      );
      inCheckLegalMoves.push(["knight", y]);
    }
  }

  //////////////////////////////////////////

  //check if your rook can eat enemy checker piece

  //find rook

  let rookPosition = undefined;

  for (let i = 0; i < chessBoard.board.length; i++) {
    //find knight position

    if (
      chessBoard.board[i].name == "rook" &&
      chessBoard.board[i].color == colorTurn
    ) {
      rookPosition = i;
      break;
    }
  }

  if (rookPosition != undefined) {
    if (chessBoard.board[checkerPiecePosition].name == "knight") {
      //check if your rook can eat enemy checker piece

      //check what tiles the rook can attack and if it incldues the checkerPieceTile

      //check right
      for (let i = rookPosition; i < 7; i++) {
        if (chessBoard.board[i + 1] == undefined) break;
        if (chessBoard.board[i + 1].name == "") continue;

        if (i == checkerPiecePosition) {
          inCheckLegalMoves.push(["rook", i]);
          console.log(
            "there is still a legal move for the rook to eat the check"
          );
          break;
        }
      }

      for (let i = rookPosition; i > -1; i--) {
        if (chessBoard.board[i - 1] == undefined) break;
        if (chessBoard.board[i - 1].name == "") continue;

        if (i == checkerPiecePosition) {
          inCheckLegalMoves.push(["rook", i]);
          console.log(
            "there is still a legal move for the rook to eat the check"
          );
          break;
        }
      }
    }
  }

  //////////////////////////////////////////////

  //check if rook can eat the piece giving the check
  //check if there is a rock behind piece giving the check
  if (checkerPiecePosition > kingPosition) {
    //right attack left

    for (let i = checkerPiecePosition; i < 7; i++) {
      if (chessBoard.board[i + 1] == undefined) break; //end of board -> CHECKAMTE

      if (chessBoard.board[i + 1].name == "") continue;

      if (
        chessBoard.board[i + 1].name == "rook" &&
        chessBoard.board[i + 1].color == colorTurn
      ) {
        inCheckLegalMoves.push(["rook", i]);
        console.log(
          "there is still a legal move for the rook to eat the check"
        );
        tilesInCheck = [];
        return;
      } //I think it needs a break on this line
    }
    if (inCheckLegalMoves.length == 0) {
      CheckMate();
    }
  } else if (checkerPiecePosition < kingPosition) {
    //left attack right

    console.log("inside");
    for (let i = checkerPiecePosition; i > -1; i--) {
      if (chessBoard.board[i - 1] == undefined) break;

      if (chessBoard.board[i - 1].name == "") continue;

      if (
        chessBoard.board[i - 1].name == "rook" &&
        chessBoard.board[i + 1].color == colorTurn
      ) {
        inCheckLegalMoves.push(["rook", i]);
        console.log(
          "there is still a legal move for the rook to eat the check"
        );
        tilesInCheck = [];
        return;
      }
    }
    if (inCheckLegalMoves.length == 0) {
      CheckMate();
    }
  }
  console.log("THERE MIGHT BE STILL A CHANCE");
  tilesInCheck = [];

  return;
};

const isChecked = () => {
  //CHECK IF YOUR KING IS IN CHECK
  //Find your king
  let kingPosition = 0;
  isInCheck = false;

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
          checkerPiecePosition = i;

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
            checkerPiecePosition = i;

            tilesInCheck = [];
            for (let k = 1; k <= j; k++) {
              if (i - k == i) continue;
              tilesInCheck.push(i - k);
            }
            console.log(tilesInCheck);

            //get checked tiles behind the king
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
            tilesInCheck = [];
            for (let x = 1; x <= j; x++) {
              if (x + 1 == i) continue; //piece checking shouldn't be in tilesChecked

              tilesInCheck.push(x + 1);
            }
            console.log(tilesInCheck);

            //get checked tiles behind the king

            for (let k = 1; k < 8; k++) {
              console.log(chessBoard.board[kingPosition + k]);
              if (chessBoard.board[kingPosition + k] != undefined) {
                tilesInCheck.push(kingPosition + k);
                break;
              }

              if (chessBoard.board[kingPosition + k] == "") {
                tilesInCheck.push(kingPosition + k);
              }
            }
            console.log("CHECK");
            checkerPiecePosition = i;
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

const editResultLabel = (result) => {
  const resultLabel = document.querySelector(".result");

  resultLabel.innerText = result;
};

const checkForStalemate = () => {
  if (
    chessBoard.board[7].name == "king" &&
    chessBoard.board[6].name == "knight" &&
    chessBoard.board[5].name == "rook" &&
    chessBoard.board[5].color == "white"
  ) {
    editResultLabel("STALEMATE");
    gameFinished = true;
    return true;
  }
  return false;
};

const makeMove = (event) => {
  //press on brown color not the pointer
  let toPosition = Number(event.target.getAttribute("value"));

  console.log(toPosition);
  console.log(legalMoves);
  if (legalMoves.includes(toPosition)) {
    updateBoardArray(fromPosition, toPosition);
    updateIcons(fromPosition, toPosition);

    changeTurn();

    if (checkForStalemate()) return;

    if (isChecked()) {
      console.log("in");
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

const checkIfStalemate = (tilePressed) => {
  // check if move would put king under check by recalculating checked tiles
  // and seeing if there is any difference

  if (
    tempChessBoard[0].name == "king" &&
    tempChessBoard[1].name == "knight" &&
    tempChessBoard[2].name == "rock" &&
    tempChessBoard[2].color == "black"
  ) {
    console.log("cant do taht move because it puts you in check");
    return false;
  }

  if (
    tempChessBoard[7].name == "king" &&
    tempChessBoard[6].name == "knight" &&
    tempChessBoard[5].name == "rock" &&
    tempChessBoard[5].color == "white"
  ) {
    console.log("cant do taht move because it puts you in check");
    return false;
  }

  /*if (isChecked()) {

    console.log("cant do taht move because it puts you in check");

    chessBoard.board = tempChessBoard;

    return false;
  }*/

  return true;
};

const showLegalMoves = (event) => {
  if (gameFinished) {
    console.log("GAME FINISHED");
    return;
  }

  const tilePressed = Number(event.target.getAttribute("value"));
  const tileAttacked = Number(chessBoard.board[tilePressed].move);

  removePointers();

  if (legalMovesDisplayed) {
    console.log("inside this");
    makeMove(event);
    return;
  }

  if (isChecked()) {
    //only allow moves to stop check

    //removePointers();
    console.log("inside");
    console.log(inCheckLegalMoves);
    //Knight moves
    if (chessBoard.board[tilePressed].name == "knight") {
      for (let i = 0; i < inCheckLegalMoves.length; i++) {
        if (inCheckLegalMoves[i][0] == "knight") {
          pointers[inCheckLegalMoves[i][1]].style.display = "block";
          legalMoves.push(inCheckLegalMoves[i][1]);
        }
      }
    }
    //rook moves
    if (chessBoard.board[tilePressed].name == "rook") {
      for (let i = 0; i < inCheckLegalMoves.length; i++) {
        if (inCheckLegalMoves[i][0] == "rook") {
          pointers[inCheckLegalMoves[i][1]].style.display = "block";
          legalMoves.push(inCheckLegalMoves[i][1]);
        }
      }
    }

    //king moves
    if (chessBoard.board[tilePressed].name == "king") {
      for (let i = 0; i < inCheckLegalMoves.length; i++) {
        if (inCheckLegalMoves[i][0] == "king") {
          console.log("moving king");
          pointers[inCheckLegalMoves[i][1]].style.display = "block";
          legalMoves.push(inCheckLegalMoves[i][1]);
        }
      }
    }
    legalMovesDisplayed = true;
    fromPosition = tilePressed;
    return;
  }

  if (chessBoard.board[tilePressed].color != colorTurn) return;

  //check if in check

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
