import { 
  Mock,
  CALLBACK_TIME } from '../../../../../gp_shared/src/services/mock.js';

import * as GameController from './controllers/game-controller.js';

export const beginGame = () => {
  return new Promise((resolve) => {
    Mock.debugRequest(beginGame);
    GameController.initializeGame();
    setTimeout(() => {
      Mock.debugSuccessfulResponse(beginGame);
      resolve();
    }, CALLBACK_TIME.POST);
  });
};

export const endTurn = (turn) => {
  return new Promise((resolve) => {
    Mock.debugRequest(endTurn);
    GameController.executePlayTurn(turn);
    setTimeout(() => {
      Mock.debugSuccessfulResponse(endTurn);
      resolve();
    }, CALLBACK_TIME.POST);
  });
};

export const beginTurn = () => {
  return new Promise((resolve) => {
    Mock.debugRequest(beginTurn);
    setTimeout(() => {
      let response = {
        gameEntities: GameController.getGameEntities(),
        gameState: GameController.getGameState()
      };
      Mock.debugSuccessfulResponse(beginTurn, response);
      resolve(Mock.prepareResponse(response));
    }, CALLBACK_TIME.POST);
  });
};