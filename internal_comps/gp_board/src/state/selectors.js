import { createSelector } from 'reselect';

const _reducedBoardSelector = state => state.gp_board.entities.reducedBoard;
const _playerPiecesSelector = state => state.gp_board.entities.playerPieces;

export const getReducedBoard = createSelector(
  _reducedBoardSelector,
  (reducedBoard) => {
    return reducedBoard;
  }
);

export const getPlayerPieces = createSelector(
  _playerPiecesSelector,
  (playerPieces) => {
    return playerPieces;
  }
);