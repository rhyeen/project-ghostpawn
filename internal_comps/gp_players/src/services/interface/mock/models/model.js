import { GAME_KEYWORDS, getTeamPlayerCode } from "../../../../../../gp_game/src/entities/game-keywords";
import { GAME_RULES } from "../../../../../../gp_game/src/entities/game-rules";

export const Model = _getInitialModel();

function _getInitialModel() {
  return {
    teams: {
      white: _getEmptyPlayers(GAME_KEYWORDS.WHITE_TEAM),
      black: _getEmptyPlayers(GAME_KEYWORDS.BLACK_TEAM)
    },
    players: {}
  };
}

export function resetPlayerPieces() {
  for (let i = 0; i < GAME_RULES.PLAYERS_ON_TEAM; i++) {
    Model.teams.white[getTeamPlayerCode(GAME_KEYWORDS.WHITE_TEAM, i)].pieces = _getEmptyPlayerPieces();
    Model.teams.black[getTeamPlayerCode(GAME_KEYWORDS.BLACK_TEAM, i)].pieces = _getEmptyPlayerPieces();
  }
}

function _getEmptyPlayers(team) {
  let players = {};
  for (let i = 0; i < GAME_RULES.PLAYERS_ON_TEAM; i++) {
    players[getTeamPlayerCode(team, i)] = {
      pieces: _getEmptyPlayerPieces()
    };
  }
  return players;
}

function _getEmptyPlayerPieces() {
  return {
    pawn: [],
    rook: [],
    bishop: [],
    knight: [],
    queen: [],
    king: []
  };
}

export function initializeModel() {
  let model = _getInitialModel();
  Model.teams = model.teams;
  Model.players = model.players;
}


