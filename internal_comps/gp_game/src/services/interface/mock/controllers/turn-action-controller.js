import { Log } from "../../../../../../gp_shared/src/services/logger";
import { getPlayerCodeTeam, GAME_KEYWORDS } from "../../../../entities/game-keywords";
import { getPlayerCode } from "../../../../../../gp_players/src/services/interface/mock/controllers/players-controller";
import * as BoardModel from "../../../../../../gp_board/src/services/interface/mock/models/model";

export const isValidTurn = (turn) => {
  for (let action of turn) {
    if (!_isValidAction(action)) {
      return false;
    }
  }
  return true;
}

export const executeTurnActions = (playerId, turn) => {
  for (let action of turn) {
    _executeAction(playerId, action);
  }
}

/**
 * @param {*} action of format:
 * {"type":"movePlayerPiece","playerPiece":{"x":4,"y":6},"movePlayerPiece":{"x":4,"y":4}}
 * 
 * @returns true if action is valid.  False otherwise.
 */
function _isValidAction(action) {
  // @TODO:
  return true;
}

function _executeAction(playerId, action) {
  switch (action.type) {
    case 'movePlayerPiece':
      _executeMovePlayerPieceAction(playerId, action);
      break;
    default:
      Log.error(`unexpected action type: ${action.type}`);
  }
}

function _executeMovePlayerPieceAction(playerId, action) {
  let playerCode = getPlayerCode(playerId);
  let board = BoardModel.Model.board;
  let pieceType = _getPieceType(playerCode, board, action.playerPiece.y, action.playerPiece.x);
  let team = getPlayerCodeTeam(playerCode);
  _removePiece(playerCode, pieceType, board, action.playerPiece.y, action.playerPiece.x);
  _removeOpposingTeamPieces(team, board, action.movePlayerPiece.y, action.movePlayerPiece.x);
  _addPiece(playerCode, pieceType, board, action.movePlayerPiece.y, action.movePlayerPiece.x);
}

function _getPieceType(playerCode, board, y, x) {
  let pieceTypes = Object.keys(board[y][x]);
  for (let pieceType of pieceTypes) {
    if (board[y][x][pieceType].has(playerCode)) {
      return pieceType;
    }
  }
  Log.error(`unexpected playerCode: ${playerCode} at ${x}:${y}`);
}

/** @MUTATES: board */
function _removePiece(playerCode, pieceType, board, y, x) {
  board[y][x][pieceType].delete(playerCode);
}

/** @MUTATES: board */
function _removeOpposingTeamPieces(team, board, y, x) {
  _removeOpposingTeamPiecesOfType(team, board, y, x, GAME_KEYWORDS.PAWN)
  _removeOpposingTeamPiecesOfType(team, board, y, x, GAME_KEYWORDS.ROOK)
  _removeOpposingTeamPiecesOfType(team, board, y, x, GAME_KEYWORDS.KNIGHT)
  _removeOpposingTeamPiecesOfType(team, board, y, x, GAME_KEYWORDS.BISHOP)
  _removeOpposingTeamPiecesOfType(team, board, y, x, GAME_KEYWORDS.QUEEN)
  _removeOpposingTeamPiecesOfType(team, board, y, x, GAME_KEYWORDS.KING)
}

function _removeOpposingTeamPiecesOfType(team, board, y, x, pieceType) {
  let playerCodes = board[y][x][pieceType];
  if (!playerCodes.size) {
    return;
  }
  for (let playerCode of playerCodes) {
    if (getPlayerCodeTeam(playerCode) !== team) {
      board[y][x][pieceType] = new Set();
    }
  }
}

/** @MUTATES: board */
function _addPiece(playerCode, pieceType, board, y, x) {
  board[y][x][pieceType].add(playerCode);
}