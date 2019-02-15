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
  boardRow[0][GAME_KEYWORDS.ROOK] = _getInitialTeamPieces(team);
  boardRow[1][GAME_KEYWORDS.KNIGHT] = _getInitialTeamPieces(team);
  boardRow[2][GAME_KEYWORDS.BISHOP] = _getInitialTeamPieces(team);
  boardRow[3][GAME_KEYWORDS.QUEEN] = _getInitialTeamPieces(team);
  boardRow[4][GAME_KEYWORDS.KING] = _getInitialTeamPieces(team);
  boardRow[5][GAME_KEYWORDS.BISHOP] = _getInitialTeamPieces(team);
  boardRow[6][GAME_KEYWORDS.KNIGHT] = _getInitialTeamPieces(team);
  boardRow[7][GAME_KEYWORDS.ROOK] = _getInitialTeamPieces(team);
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
    boardRow[i][GAME_KEYWORDS.PAWN] = _getInitialTeamPieces(team);
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
  let cell = {};
  cell[GAME_KEYWORDS.PAWN] = new Set()
  cell[GAME_KEYWORDS.ROOK] = new Set()
  cell[GAME_KEYWORDS.KNIGHT] = new Set()
  cell[GAME_KEYWORDS.BISHOP] = new Set()
  cell[GAME_KEYWORDS.QUEEN] = new Set()
  cell[GAME_KEYWORDS.KING] = new Set()
  return cell;
}

export function initializeModel() {
  let model = _getInitialModel();
  Model.board = [...model.board];
}
