import { GAME_KEYWORDS } from "../../../gp_game/src/entities/game-keywords";
import { SET_PLAYER_PIECES } from "../state/actions";

/**
  returns an array of `{ x: <0-7>, y: <0-7> }` elements, where each element is a valid move for the given piece based on the given board.

  pieceTeam: the team of piece, either GAME_KEYWORDS.WHITE_TEAM or GAME_KEYWORDS.BLACK_TEAM.
  pieceType: the type of the piece, one of the values from GAME_KEYWORDS.PAWN though .KING.
  pieceX: the x (column) coordinate of the piece.
  pieceY: the y (row) coordinate of the piece.
  board: the state of the board.  Of the following format:
  [
    [
      {
        "team": GAME_KEYWORDS.BLACK_TEAM, // which team is on this space
        "playerPiece": GAME_KEYWORDS.PAWN, // undefined if the player does not have a piece here, otherwise, one of the values from GAME_PIECE. 
        <GAME_KEYWORDS.PAWN>: 0, // where <GAME_KEYWORDS.PAWN> is actually "pawn", but you should always use the reference like so: `board[0][0][GAME_KEYWORDS.PAWN]` to ensure consistency across the product.
        <GAME_KEYWORDS.ROOK>: 50, // number of this type of piece on that cell. Only matters if it's 0 or > 0.
        <GAME_KEYWORDS.KNIGHT>: 0,
        <GAME_KEYWORDS.BISHOP>: 0,
        <GAME_KEYWORDS.QUEEN>: 0,
        <GAME_KEYWORDS.KING>: 0
      },
      ...
    ],
    ...
  ]
*/
export function getValidMoves(pieceTeam, pieceType, pieceX, pieceY, board) {
  return _getMoves(pieceTeam, pieceType, pieceX, pieceY, board);
}

// @TODO: ADD stop when hits piece
function _getMoves(pieceTeam, pieceType, pieceX, pieceY, board) {
  switch(pieceType) {
    case GAME_KEYWORDS.PAWN:
      return _pawnMoves(pieceTeam, pieceX, pieceY, board);
    case GAME_KEYWORDS.ROOK:
      return _rookMoves(pieceTeam, pieceX, pieceY, board);
    case GAME_KEYWORDS.KNIGHT:
      return _knightMoves(pieceTeam, pieceX, pieceY, board);
    case GAME_KEYWORDS.BISHOP:
      return _bishopMoves(pieceTeam, pieceX, pieceY, board);
    case GAME_KEYWORDS.QUEEN:
      return _queenMoves(pieceTeam, pieceX, pieceY, board);
    case GAME_KEYWORDS.KING:
      return _kingMoves(pieceTeam, pieceX, pieceY, board);
  }
}

// @TODO: ADD pawn attack
function _pawnMoves(pieceTeam, pieceX, pieceY, board) {
  let moves = [];
  if (pieceTeam === GAME_KEYWORDS.WHITE_TEAM) {
    _addIfMoveOnBoard(pieceX, pieceY - 1, pieceX, pieceY, moves);
    if (pieceY === 6) {
      moves.push({ x: pieceX, y: pieceY - 2 });
    }
  } else {
    _addIfMoveOnBoard(pieceX, pieceY + 1, pieceX, pieceY, moves);
    if (pieceY === 1) {
      moves.push({ x: pieceX, y: pieceY + 2 });
    }
  }
  _pawnAttack(pieceTeam, pieceX, pieceY, moves, board);
  return moves;
}

// @TODO FINISH
function _pawnAttack(pieceTeam, pieceX, pieceY, moves, board) {
  if (pieceTeam === GAME_KEYWORDS.WHITE_TEAM) {
    debugger;
    let playPiece = board[6][0].playerPiece;
    console.log(playPiece);
  } else {

  }
}

function _rookMoves(pieceTeam, pieceX, pieceY, board) {
  let moves = [];
  for (let i = 0; i < 8; i++) {
    _addIfMoveOnBoard(i, pieceY, pieceX, pieceY, moves);
    _addIfMoveOnBoard(pieceX, i, pieceX, pieceY, moves);
  }
  return moves;
}

function _knightMoves(pieceTeam, pieceX, pieceY, board) {
  let moves = [];
  let one = 1;
  let two = 2;
  for (let i = 1; i <= 4; i++) {
    one *= -1;
    if (i > 2) {
      two = -2;
    }
    _addIfMoveOnBoard(pieceX + one, pieceY + two, pieceX, pieceY, moves);
    _addIfMoveOnBoard(pieceX + two, pieceY + one, pieceX, pieceY, moves);
  }
  return moves;
}

function _bishopMoves(pieceTeam, pieceX, pieceY, board) {
  let moves = [];
  let right = 7 - pieceX;
  let left = pieceX;
  let step = 0;
  while (left > 0) {
    left--;
    step++;
    // NW diagonal
    _addIfMoveOnBoard(pieceX - step, pieceY - step, pieceX, pieceY, moves);
    // SW diagonal
    _addIfMoveOnBoard(pieceX - step, pieceY + step, pieceX, pieceY, moves);
  }
  step = 0;
  while (right > 0) {
    right--;
    step++;
    // NE diagonal
    _addIfMoveOnBoard(pieceX + step, pieceY - step, pieceX, pieceY, moves);
    // SE diagonal
    _addIfMoveOnBoard(pieceX + step, pieceY + step, pieceX, pieceY, moves);
  }
  return moves;
}

function _queenMoves(pieceTeam, pieceX, pieceY, board) {
  let moves = _rookMoves(pieceTeam, pieceX, pieceY, board);
  moves = moves.concat(_bishopMoves(pieceTeam, pieceX, pieceY, board));
  return moves;
}

// @TODO: ADD king/rook swap
function _kingMoves(pieceTeam, pieceX, pieceY, board) {
  let moves = [];
  for (let i = pieceX - 1; i <= pieceX + 1; i++) {
    for (let j = pieceY - 1; j <= pieceY + 1; j++) {
      _addIfMoveOnBoard(i, j, pieceX, pieceY, moves);
    }
  }
  return moves;
}

function _addIfMoveOnBoard(x, y, pieceX, pieceY, moves) {
  if ((x >= 0 && x <= 7) && (y >= 0 && y <= 7)) {
    if (x != pieceX || y != pieceY) {
      moves.push({ x: x, y: y });
    }
  }
}