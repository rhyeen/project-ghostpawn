import { GAME_KEYWORDS, getTeamPlayerCode } from "../../../../../../gp_game/src/entities/game-keywords";
import { GAME_RULES } from "../../../../../../gp_game/src/entities/game-rules";

export const Model = _getInitialModel();

function _getInitialModel() {
  return {
    board: [
      _getCastleBoardRow(GAME_KEYWORDS.BLACK_TEAM),
      _getPawnsBoardRow(GAME_KEYWORDS.BLACK_TEAM),
      _getEmptyBoardRow(),
      _getEmptyBoardRow(),
      _getEmptyBoardRow(),
      _getEmptyBoardRow(),
      _getPawnsBoardRow(GAME_KEYWORDS.WHITE_TEAM),
      _getCastleBoardRow(GAME_KEYWORDS.WHITE_TEAM)
    ]
  };
}

function _getCastleBoardRow(team) {
  let boardRow = _getEmptyBoardRow();
  boardRow[0].rook = _getInitialTeamPieces(team);
  boardRow[1].knight = _getInitialTeamPieces(team);
  boardRow[2].bishop = _getInitialTeamPieces(team);
  boardRow[3].queen = _getInitialTeamPieces(team);
  boardRow[4].king = _getInitialTeamPieces(team);
  boardRow[5].bishop = _getInitialTeamPieces(team);
  boardRow[6].knight = _getInitialTeamPieces(team);
  boardRow[7].rook = _getInitialTeamPieces(team);
  return boardRow;
}

function _getInitialTeamPieces(team) {
  let teamPieces = new Set();
  for (let i = 0; i < GAME_RULES.PLAYERS_ON_TEAM; i++) {
    teamPieces.add(getTeamPlayerCode(team, i));
  }
  return teamPieces;
}

function _getPawnsBoardRow(team) {
  let boardRow = _getEmptyBoardRow();
  for (let i = 0; i < boardRow.length; i++) {
    boardRow[i].pawn = _getInitialTeamPieces(team);
  }
  return boardRow;
} 

function _getEmptyBoardRow() {
  let boardRow = [];
  for (let i = 0; i < 8; i++) {
    boardRow.push(_getEmptyBoardCell());
  }
  return boardRow;
}

function _getEmptyBoardCell() {
  return {
    pawn: new Set(),
    rook: new Set(),
    bishop: new Set(),
    knight: new Set(),
    queen: new Set(),
    king: new Set()
  };
}

export function initializeModel() {
  let model = _getInitialModel();
  Model.board = [...model.board];
}
