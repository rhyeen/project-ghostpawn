import { getReducedBoard } from '../../../../../../gp_board/src/services/interface/mock/controllers/board-controller.js';
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
  let board = getReducedBoard();
  debugger;
  let playerPiece = _getRandomPieceWithMove(playerPieces, board);
  // The following return values are the ones that need to be altered:
  // turn[0].playerPiece.x, turn[0].playerPiece.y, turn[0].movePlayerPiece.x, turn[0].movePlayerPiece.x
  return { 
    playerId: playerCode,
    turn:[
      {
        type: 'movePlayerPiece',
        playerPiece: {
          x: playerPieces[GAME_KEYWORDS.PAWN][0].x,
          y: playerPieces[GAME_KEYWORDS.PAWN][0].y
        },
        movePlayerPiece: {
          x: Math.floor(Math.random() * 8),
          y: Math.floor(Math.random() * 2) + 3
        }
      }
    ]
  };
}

function _getRandomPieceWithMove(playerPieces, board) {
  let rand = Math.floor(Math.random() * playerPieces.length);
  for (let i = 0; i < playerPieces.length; i++) {
    pieceType = playerPieces[(rand + i) % playerPieces.length];
    
  }
}