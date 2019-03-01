import { getReducedBoard } from '../../../../../../gp_board/src/services/interface/mock/controllers/board-controller.js';
import { getCombinedBoard } from '../../../../../../gp_board/src/services/board-manipulator.js';
import { GAME_KEYWORDS } from '../../../../entities/game-keywords.js';
import { getValidMoves} from '../../../../../../gp_board/src/services/move-validator';

/**
 * 
 * @param {string} playerCode something like "W0" or "B43"
 * @param {*} playerPieces {
    "pawn": [
      {
        "y": 1,
        "x": 0
      },
      ...
    ],
    "rook": [
      {
        "y": 0,
        "x": 0
      },
      {
        "y": 0,
        "x": 7
      }
    ],
    ...
  }
 * 
 */
export function getPlayersRandomTurn(playerCode, playerPieces) {
  let board = getCombinedBoard(getReducedBoard(), playerPieces);
  let pieceWithMoves = _getRandomPieceWithMoves(playerPieces, board);
  let playerPiece = pieceWithMoves.piece;
  if (playerPiece === null) {
    return null;
  }
  let move = _getRandomMoveFromPiece(pieceWithMoves.moves);
  // The following return values are the ones that need to be altered:
  // turn[0].playerPiece.x, turn[0].playerPiece.y, turn[0].movePlayerPiece.x, turn[0].movePlayerPiece.x
  return { 
    playerId: playerCode,
    turn:[
      {
        type: 'movePlayerPiece',
        playerPiece,
        movePlayerPiece: {
          x: move.x,
          y: move.y
        }
      }
    ]
  };
}

function _getRandomPieceWithMoves(playerPieces, board) {
  let seed = Math.floor(Math.random() * 5);
  let pieceType, piece, moves;
  for (let i = 0; i < 6; i++) {
    pieceType = _getRandomPieceType((seed + i) % 6);
    for (let j = 0; j < playerPieces[pieceType].length; j++) {
      piece = playerPieces[pieceType][(j + seed) % playerPieces[pieceType].length];
      moves = getValidMoves(piece.x, piece.y, board);
      if (moves.length > 0) {
        return { piece, moves };
      }
    }
  }
  return null;
}

function _getRandomMoveFromPiece(moves) {
  return moves[Math.floor(Math.random() * moves.length)];
}

function _getRandomPieceType(seed) {
  switch(seed) {
    case 0:
      return GAME_KEYWORDS.PAWN;
    case 1:
      return GAME_KEYWORDS.ROOK;
    case 2:
      return GAME_KEYWORDS.BISHOP;
    case 3:
      return GAME_KEYWORDS.KNIGHT;
    case 4:
      return GAME_KEYWORDS.QUEEN;
    case 5:
      return GAME_KEYWORDS.KING;
  }
}