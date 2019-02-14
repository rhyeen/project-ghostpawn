import { put, takeEvery, all, call } from 'redux-saga/effects';
import * as GameInterface from '../services/interface/game.js';
import * as GameSelector from './selectors.js';
import { localStore } from './store.js';

import * as Actions from './actions.js';
import { GAME_STATES } from '../entities/game-states.js';

function* _beginTurn() {
  let { gameState } = yield call(GameInterface.beginTurn);
  yield _setGameState(gameState);
  yield put(Actions.beginTurn.success());
}

function* _resetGame() {
  yield call(GameInterface.beginGame);
  yield put(Actions.beginTurn.request());
  yield put(Actions.resetGame.success());
}

function* _setGameState(gameState) {
  switch (gameState) {
    case GAME_STATES.LOSE:
      yield put(Actions.loseGame.request());
      return;
    case GAME_STATES.WIN:
      yield put(Actions.winGame.request());
      return;
  }
}

function* _winGame() {
  yield put(Actions.winGame.success());
}

function* _loseGame() {
  yield put(Actions.loseGame.success());
}

function* _endTurn() {
  yield call(_callEndTurn);
  yield put(Actions.endTurn.success());
  yield put(Actions.beginCrafting.request());
}

function _callEndTurn() {
  const state = localStore.getState();
  let turn = GameSelector.getPendingTurn(state);
  return GameInterface.endTurn(turn);
}

export default function* root() {
  yield all([
    takeEvery(Actions.RESET_GAME.REQUEST, _resetGame),
    takeEvery(Actions.WIN_GAME.REQUEST, _winGame),
    takeEvery(Actions.LOSE_GAME.REQUEST, _loseGame),
    takeEvery(Actions.END_TURN.REQUEST, _endTurn),
    takeEvery(Actions.BEGIN_TURN.REQUEST, _beginTurn),
  ]);
}