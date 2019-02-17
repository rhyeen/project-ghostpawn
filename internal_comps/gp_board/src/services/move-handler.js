import { Log } from '../../../gp_shared/src/services/logger.js';
import { GAME_KEYWORDS } from "../../../gp_game/src/entities/game-keywords";
import { getCellTeam } from './move-validator.js';

export function executePlayerPieceMove(playerPieces, reducedBoard, currentY, currentX, newY, newX) {
  let updatedPieces = _updatePlayerPiece(playerPieces, currentY, currentX, newY, newX);
  let updatedReducedBoard = _updatedReducedBoard(updatedPieces.pieceType, reducedBoard, currentY, currentX, newY, newX);
  return {playerPieces: updatedPieces.playerPieces, reducedBoard: updatedReducedBoard };
}

function _updatePlayerPiece(playerPieces, currentY, currentX, newY, newX) {
  let { pieceType, index } = _getTargetedPlayerPiece(playerPieces, currentY, currentX);
  playerPieces = {
    ...playerPieces
  };
  playerPieces[pieceType] = [
    ...playerPieces[pieceType]
  ];
  playerPieces[pieceType][index] = { x: newX, y: newY };
  return { playerPieces, pieceType };
}

function _updatedReducedBoard(pieceType, reducedBoard, currentY, currentX, newY, newX) {
  reducedBoard = _getShallowCopyOfBoardAtCoordinates(reducedBoard, currentY, currentX);
  reducedBoard = _getShallowCopyOfBoardAtCoordinates(reducedBoard, newY, newX);
  let team = getCellTeam(currentX, currentY, reducedBoard);
  _removePiece(pieceType, reducedBoard, currentY, currentX);
  _removeOpposingTeamPieces(team, reducedBoard, newY, newX);
  _addPiece(team, pieceType, reducedBoard, newY, newX);
  return reducedBoard;
}

/** @MUTATES: board */
function _removePiece(pieceType, board, y, x) {
  board[y][x][pieceType] -= 1;
  if (!_doPiecesRemain(board, y, x)) {
    board.team = null;
  }
}

function _doPiecesRemain(board, y, x) {
  return (
    board[y][x][GAME_KEYWORDS.PAWN] + 
    board[y][x][GAME_KEYWORDS.ROOK] + 
    board[y][x][GAME_KEYWORDS.KNIGHT] + 
    board[y][x][GAME_KEYWORDS.BISHOP] + 
    board[y][x][GAME_KEYWORDS.QUEEN] + 
    board[y][x][GAME_KEYWORDS.KING] > 0
  );
}

/** @MUTATES: board */
function _removeOpposingTeamPieces(team, board, y, x) {
  if (team === board[y][x].team) {
    return board;
  }
  board[y][x][GAME_KEYWORDS.PAWN] = 0
  board[y][x][GAME_KEYWORDS.ROOK] = 0
  board[y][x][GAME_KEYWORDS.KNIGHT] = 0
  board[y][x][GAME_KEYWORDS.BISHOP] = 0
  board[y][x][GAME_KEYWORDS.QUEEN] = 0
  board[y][x][GAME_KEYWORDS.KING] = 0
}

/** @MUTATES: board */
function _addPiece(team, pieceType, board, y, x) {
  board[y][x].team = team;
  board[y][x][pieceType] += 1;
}

function _getShallowCopyOfBoardAtCoordinates(board, y, x) {
  board = [...board];
  board[y] = [...board[y]];
  board[y][x] = { ...board[y][x] };
  return board;
}

function _getTargetedPlayerPiece(playerPieces, targetY, targetX) {
  let pieceTypes = Object.keys(playerPieces);
  for (let pieceType of pieceTypes) {
    for (let i = 0; i < playerPieces[pieceType].length; i++) {
      if (playerPieces[pieceType][i].x === targetX && playerPieces[pieceType][i].y === targetY) {
        return { pieceType, index: i };
      }
    }
  }
  Log.error(`Could not find a player piece at ${targetX}:${targetY}`);
  return { pieceType: GAME_KEYWORDS.BISHOP, index: 0 };
}