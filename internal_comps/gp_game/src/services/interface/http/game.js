import { Http } from '../../../../../gp_shared/src/services/http.js';

export const beginGame = (playerId) => {
  return Http.post('game/begin');
}

export const endTurn = (turn) => {
  return Http.post('game/turn/play');
}