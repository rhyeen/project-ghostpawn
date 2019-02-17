import { initializeModel, recordPlayerTurn } from '../models/model.js';
import * as TurnActionController from './turn-action-controller.js';
import { GAME_STATES } from '../../../../entities/game-states.js';
import * as BoardController from '../../../../../../gp_board/src/services/interface/mock/controllers/board-controller.js';
import * as PlayersController from '../../../../../../gp_players/src/services/interface/mock/controllers/players-controller.js';
import * as PlayersModel from '../../../../../../gp_players/src/services/interface/mock/models/model.js';
import { GAME_KEYWORDS } from '../../../../entities/game-keywords.js';
import { getPlayersRandomTurn } from './turn-controller.js';

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

export const executeTeamsTurn = (team) => {
  let teamsTurn = _getTeamsTurn(team);
  for (let playersTurn of teamsTurn) {
    executePlayTurn(playersTurn.playerId, playersTurn.turn);
  }
};

function _getTeamsTurn(team) {
  let players;
  if (team === GAME_KEYWORDS.WHITE_TEAM) {
    players = PlayersModel.Model.teams.white;
  } else {
    players = PlayersModel.Model.teams.black;
  }
  let playerCodes = Object.keys(players);
  let turns = [];
  for (let playerCode of playerCodes) {
    // @DEBUG: removing testPlayer
    if (playerCode === 'W1') {
      continue;
    }
    turns.push(getPlayersRandomTurn(playerCode, players[playerCode].pieces));
  }
  return turns;
}

