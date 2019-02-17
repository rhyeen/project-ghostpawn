import { 
  Mock,
  CALLBACK_TIME } from '../../../../../gp_shared/src/services/mock.js';

import * as GameController from './controllers/game-controller.js';

export const beginGame = (playerId) => {
  return new Promise((resolve) => {
    Mock.debugRequest(beginGame, playerId);
    GameController.initializeGame(playerId);
    setTimeout(() => {
      Mock.debugSuccessfulResponse(beginGame);
      resolve();
    }, CALLBACK_TIME.POST);
  });
};

export const endTurn = (playerId, turn) => {
  return new Promise((resolve) => {
    Mock.debugRequest(endTurn, {playerId, turn});
    GameController.executePlayTurn(playerId, turn);
    GameController.executeWhiteTeamsTurn();
    GameController.executeBlackTeamsTurn();
    setTimeout(() => {
      Mock.debugSuccessfulResponse(endTurn);
      resolve();
    }, CALLBACK_TIME.POST);
  });
};

export const beginTurn = (playerId) => {
  return new Promise((resolve) => {
    Mock.debugRequest(beginTurn, playerId);
    setTimeout(() => {
      let response = {
        gameEntities: GameController.getGameEntities(playerId),
        gameState: GameController.getGameState()
      };
      Mock.debugSuccessfulResponse(beginTurn, response);
      resolve(Mock.prepareResponse(response));
    }, CALLBACK_TIME.POST);
  });
};