import { put, takeEvery, all, call } from 'redux-saga/effects';

import * as GameActions from '../../../gp_game/src/state/actions.js';
import * as BoardSelector from './selectors.js';
import * as Actions from './actions.js';

import { localStore } from './store.js';
import { executePlayerPieceMove } from '../services/move-handler.js';

function* _movePlayerPiece({currentY, currentX, newY, newX}) {
  let { playerPieces, reducedBoard } = yield _handleMovePlayerPieceChanges(currentY, currentX, newY, newX);
  yield put(Actions.movePlayerPiece.success(playerPieces, reducedBoard));
  yield put(GameActions.recordAction({
    type: 'movePlayerPiece',
    playerPiece: {
      x: currentX,
      y: currentY
    },
    movePlayerPiece: {
      x: newX,
      y: newY
    }
  }));
  yield put(GameActions.endTurn.request());
}

function _handleMovePlayerPieceChanges(currentY, currentX, newY, newX) {
  const state = localStore.getState();
  let playerPieces = BoardSelector.getPlayerPieces(state);
  let reducedBoard = BoardSelector.getReducedBoard(state);
  return executePlayerPieceMove(playerPieces, reducedBoard, currentY, currentX, newY, newX);
}

export default function* root() {
  yield all([
    takeEvery(Actions.MOVE_PLAYER_PIECE.REQUEST, _movePlayerPiece),
  ]);
}
