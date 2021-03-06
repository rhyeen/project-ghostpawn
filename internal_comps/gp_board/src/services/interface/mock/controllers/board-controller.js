import { initializeModel, Model } from '../models/model.js';
import { isPlayerCodeWhiteTeam, GAME_KEYWORDS } from '../../../../../../gp_game/src/entities/game-keywords.js';

export const initializeBoard = () => {
  initializeModel();
};

export const getReducedBoard = () => {
  let reducedBoard = [];
  for (let i = 0; i < Model.board.length; i++) {
    let reducedBoardRow = [];
    for (let j = 0; j < Model.board[i].length; j++) {
      reducedBoardRow.push(_getReducedBoardCell(Model.board[i][j]));
    }
    reducedBoard.push(reducedBoardRow);
  }
  return reducedBoard;
};

function _getReducedBoardCell(cell) {
  let reducedCell = {
    team: _getBoardCellTeam(cell)
  };
  reducedCell[GAME_KEYWORDS.PAWN] = 0;
  reducedCell[GAME_KEYWORDS.ROOK] = 0;
  reducedCell[GAME_KEYWORDS.KNIGHT] = 0;
  reducedCell[GAME_KEYWORDS.BISHOP] = 0;
  reducedCell[GAME_KEYWORDS.QUEEN] = 0;
  reducedCell[GAME_KEYWORDS.KING] = 0;
  if (!reducedCell.team) {
    return reducedCell;
  }
  let pieces = Object.keys(cell);
  for (let piece of pieces) {
    reducedCell[piece] = cell[piece].size;
  }
  return reducedCell;
}

function _getBoardCellTeam(cell) {
  let pieces = Object.keys(cell);
  for (let piece of pieces) {
    for (let playerCode of cell[piece]) {
      if (isPlayerCodeWhiteTeam(playerCode)) {
        return GAME_KEYWORDS.WHITE_TEAM;
      } else {
        return GAME_KEYWORDS.BLACK_TEAM;
      }
    }
  }
  return null;
}