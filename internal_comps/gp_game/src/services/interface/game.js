import {
  INTERFACE,
  interfaceState,
  invalidInterfaceState } from '../../../../gp_shared/src/services/interface-state.js';

import * as CallHttp from './http/game.js';
import * as CallMock from './mock/game.js';

export const beginGame = (playerId) => {
  switch (interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.beginGame(playerId);
    case INTERFACE.MOCK:
      return CallMock.beginGame(playerId);
    default:
      return invalidInterfaceState();
  }
};

export const endTurn = (turn) => {
  switch (interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.endTurn(turn);
    case INTERFACE.MOCK:
      return CallMock.endTurn(turn);
    default:
      return invalidInterfaceState();
  }
};

export const beginTurn = (playerId) => {
  switch (interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.beginTurn(playerId);
    case INTERFACE.MOCK:
      return CallMock.beginTurn(playerId);
    default:
      return invalidInterfaceState();
  }
};