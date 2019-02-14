import { initializeModel, recordPlayerTurn } from '../models/model.js';
import * as TurnActionController from './turn-action-controller.js';
import { GAME_STATES } from '../../../../entities/game-states.js';

export const initializeGame = () => {
  // BoardController.initializeBoard();
  // PlayersController.initializePlayers();
  initializeModel();
};

export const getGameState = () => {
  if (_gameIsLost()) {
    return GAME_STATES.LOSE;
  }
  if (_gameIsWon()) {
    return GAME_STATES.WIN;
  }
  return GAME_STATES.PLAYING;
}

export const getGameEntities = () => {
  return {};
}

function _gameIsLost() {
  return false;
}

function _gameIsWon() {
  return false;
}

export const executePlayTurn = (turn) => {
  let validTurn = TurnActionController.isValidTurn(turn);
  if (validTurn) {
    TurnActionController.executeTurnActions(turn);
    recordPlayerTurn(turn);
  }
};
