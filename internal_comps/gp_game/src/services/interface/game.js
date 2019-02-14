import {
  INTERFACE,
  interfaceState,
  invalidInterfaceState } from '../../../../gp_shared/src/services/interface-state.js';

import * as CallHttp from './http/game.js';
import * as CallMock from './mock/game.js';

export const beginGame = () => {
  switch (interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.beginGame();
    case INTERFACE.MOCK:
      return CallMock.beginGame();
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

export const beginTurn = () => {
  switch (interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.beginTurn();
    case INTERFACE.MOCK:
      return CallMock.beginTurn();
    default:
      return invalidInterfaceState();
  }
};