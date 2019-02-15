import { initializeModel, resetPlayerPieces, Model } from '../models/model.js';
import * as BoardModel from '../../../../../../gp_board/src/services/interface/mock/models/model.js';
import { isPlayerCodeWhiteTeam } from '../../../../../../gp_game/src/entities/game-keywords.js';

export const initializePlayers = () => {
  initializeModel();
};

export const syncPiecesToPlayers = () => {
  resetPlayerPieces();
  let board = BoardModel.Model.board;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let pieces = Object.keys(board[i][j]);
      for (let piece of pieces) {
        for (let playerCode of board[i][j][piece]) {
          if (isPlayerCodeWhiteTeam(playerCode)) {
            Model.teams.white[playerCode].pieces[piece].push({
              x: i,
              y: j
            });
          } else {
            Model.teams.black[playerCode].pieces[piece].push({
              x: i,
              y: j
            });
          }
        }
      }
    }
  }
};
