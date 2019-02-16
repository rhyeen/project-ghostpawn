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
// @TODO: REMOVE pieceTeam (confirm)
// @TODO: ADD stop when hits piece
export function getValidMoves(pieceTeam, pieceType, pieceX, pieceY, board) {
  switch(pieceType) {
    case GAME_KEYWORDS.PAWN:
      return _pawnMoves(pieceX, pieceY, board);
    case GAME_KEYWORDS.ROOK:
      return _rookMoves(pieceX, pieceY, board);
    case GAME_KEYWORDS.KNIGHT:
      return _knightMoves(pieceX, pieceY, board);
    case GAME_KEYWORDS.BISHOP:
      return _bishopMoves(pieceX, pieceY, board);
    case GAME_KEYWORDS.QUEEN:
      return _queenMoves(pieceX, pieceY, board);
    case GAME_KEYWORDS.KING:
      return _kingMoves(pieceX, pieceY, board);
  }
}

function _pawnMoves(pieceX, pieceY, board) {
  let moves = [];
  if (_getPieceTeam(pieceX, pieceY, board) === GAME_KEYWORDS.WHITE_TEAM) {
    _checkCollision(pieceX, pieceY - 1, pieceX, pieceY, moves, board);
    if (pieceY === 6) {
      moves.push({ x: pieceX, y: pieceY - 2 });
    }
  } else {
    _checkCollision(pieceX, pieceY + 1, pieceX, pieceY, moves, board);
    if (pieceY === 1) {
      moves.push({ x: pieceX, y: pieceY + 2 });
    }
  }
  _pawnAttack(pieceX, pieceY, moves, board);
  return moves;
}

// @TODO TEST
function _pawnAttack(pieceX, pieceY, moves, board) {
  if (_getPieceTeam(pieceX, pieceY, board) === GAME_KEYWORDS.WHITE_TEAM) {
    if (_getPieceTeam(pieceX - 1, pieceY - 1, board) === GAME_KEYWORDS.BLACK_TEAM) {
      _addIfMoveOnBoard(pieceX - 1, pieceY - 1, board);
    }
    if (_getPieceTeam(pieceX + 1, pieceY - 1, board) === GAME_KEYWORDS.BLACK_TEAM) {
      _addIfMoveOnBoard(pieceX + 1, pieceY + 1, board);
    }
  } else {
    if (_getPieceTeam(pieceX - 1, pieceY + 1, board) === GAME_KEYWORDS.WHITE_TEAM) {
      _addIfMoveOnBoard(pieceX - 1, pieceY + 1, board);
    }
    if (_getPieceTeam(pieceX + 1, pieceY + 1, board) === GAME_KEYWORDS.WHITE_TEAM) {
      _addIfMoveOnBoard(pieceX + 1, pieceY + 1, board);
    }
  }
}

function _rookMoves(pieceX, pieceY, board) {
  let moves = [];
  let collisionUp = false;
  let collisionLeft = false;
  let collisionDown = false;
  let collisionRight = false;
  // up
  let step = pieceY - 1;
  while (step > 0 && !(collisionUp)) {
    collisionUp = _checkCollision(pieceX, step, pieceX, pieceY, moves, board);
    step--;
  }
  // left
  step = pieceX - 1;
  while (step > 0 && !(collisionLeft)) {
    collisionLeft = _checkCollision(step, pieceY, pieceX, pieceY, moves, board);
    step--;
  }
  // down
  step = pieceY + 1;
  while (step < 7 && !(collisionLeft)) {
    collisionLeft = _checkCollision(pieceX, step, pieceX, pieceY, moves, board);
    step++;
  }
  // right
  step = pieceX + 1;
  while (step < 7 && !(collisionLeft)) {
    collisionLeft = _checkCollision(step, pieceY, pieceX, pieceY, moves, board);
    step++;
  }
  return moves;
}

function _knightMoves(pieceX, pieceY, board) {
  let moves = [];
  let one = 1;
  let two = 2;
  for (let i = 1; i <= 4; i++) {
    one *= -1;
    if (i > 2) {
      two = -2;
    }
    _checkCollision(pieceX + one, pieceY + two, pieceX, pieceY, moves, board);
    _checkCollision(pieceX + two, pieceY + one, pieceX, pieceY, moves, board);
  }
  return moves;
}

function _bishopMoves(pieceX, pieceY, board) {
  let moves = [];
  let right = 7 - pieceX;
  let left = pieceX;
  let step = 0;
  let collisionNW = false;
  let collisionSW = false;
  let collisionNE = false;
  let collisionSE = false;
  while (left > 0 || (collisionNW && collisionSW)) {
    left--;
    step++;
    // NW diagonal
    if (!collisionNW) {
      collisionNW = _checkCollision(pieceX - step, pieceY - step, pieceX, pieceY, moves, board);
    }
    // SW diagonal
    if (!collisionSW) {
      collisionSW = _checkCollision(pieceX - step, pieceY + step, pieceX, pieceY, moves, board);
    }
  }
  step = 0;
  while (right > 0 || (collisionNE && collisionSE)) {
    right--;
    step++;
    // NE diagonal
    if (!collisionNE) {
      collisionNE = _checkCollision(pieceX + step, pieceY - step, pieceX, pieceY, moves, board);
    }
    // SE diagonal
    if (!collisionSE) {
      collisionSE = _checkCollision(pieceX + step, pieceY + step, pieceX, pieceY, moves, board);
    }
  }
  return moves;
}

function _queenMoves(pieceX, pieceY, board) {
  let moves = _rookMoves(pieceX, pieceY, board);
  moves = moves.concat(_bishopMoves(pieceX, pieceY, board));
  return moves;
}

// @TODO: ADD king/rook swap
function _kingMoves(pieceX, pieceY, board) {
  let moves = [];
  for (let i = pieceX - 1; i <= pieceX + 1; i++) {
    for (let j = pieceY - 1; j <= pieceY + 1; j++) {
      _checkCollision(i, j, pieceX, pieceY, moves, board);
    }
  }
  return moves;
}

function _checkCollision(targetX, targetY, pieceX, pieceY, moves, board) {
  if (_getPieceTeam(targetX, targetY, board) === undefined) {
    _addIfMoveOnBoard(targetX, targetY, moves);
    return false;
  } else {
    if (_getPlayerPiece(targetX, targetY, board) === undefined) {
      if (_getPieceTeam(pieceX, pieceY, board) === _getPieceTeam(targetX, targetY, board)) {
        _addIfMoveOnBoard(targetX, targetY, moves);
        return false;
      } else {
        _addIfMoveOnBoard(targetX, targetY, moves);
        return true;
      }
    } else {
      return true;
    }
  }
}

function _addIfMoveOnBoard(x, y, moves) {
  if (_onBoard(x, y)) {
      moves.push({ x: x, y: y });
  }
}

function _getPieceTeam(pieceX, pieceY, board) {
  if (_onBoard(pieceX, pieceY)) {
    return board[pieceY][pieceX].team;
  }
  return undefined;
}

function _getPlayerPiece(pieceX, pieceY, board) {
  if (_onBoard(pieceX, pieceY)) {
    return board[pieceY][pieceX].playerPiece;
  }
  return undefined;
}

function _onBoard(x, y) {
  if ((x >= 0 && x <= 7) && (y >= 0 && y <= 7)) {
    return true;
  }
  return false;
}