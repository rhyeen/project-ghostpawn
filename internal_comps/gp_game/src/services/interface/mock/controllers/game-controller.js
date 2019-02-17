import { initializeModel, recordPlayerTurn } from '../models/model.js';
import * as TurnActionController from './turn-action-controller.js';
import { GAME_STATES } from '../../../../entities/game-states.js';
import * as BoardController from '../../../../../../gp_board/src/services/interface/mock/controllers/board-controller.js';
import * as PlayersController from '../../../../../../gp_players/src/services/interface/mock/controllers/players-controller.js';

export const initializeGame = (playerId) => {
  BoardController.initializeBoard();
  PlayersController.initializePlayers();
  PlayersController.addPlayer(playerId);
  PlayersController.syncPiecesToPlayers();
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

export const getGameEntities = (playerId) => {
  return {
    reducedBoard: BoardController.getReducedBoard(),
    playerPieces: PlayersController.getPlayerPieces(playerId)
  };
}

function _gameIsLost() {
  return false;
}

function _gameIsWon() {
  return false;
}

export const executePlayTurn = (playerId, turn) => {
  let validTurn = TurnActionController.isValidTurn(playerId, turn);
  if (validTurn) {
    TurnActionController.executeTurnActions(playerId, turn);
    recordPlayerTurn(turn);
  }
  PlayersController.syncPiecesToPlayers();
};

export const executeWhiteTeamsTurn = () => {
  let teamsTurn = _getWhiteTeamsTurn();
  for (let playersTurn of teamsTurn) {
    executePlayTurn(playersTurn.playerId, playersTurn.turn);
  }
};

export const executeBlackTeamsTurn = () => {
  let teamsTurn = _getBlackTeamsTurn();
  for (let playersTurn of teamsTurn) {
    executePlayTurn(playersTurn.playerId, playersTurn.turn);
  }
};

function _getWhiteTeamsTurn() {
  // @TODO:
  return [];
}

function _getBlackTeamsTurn() {
  // @TODO:
  return [];
}
