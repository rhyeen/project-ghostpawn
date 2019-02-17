import * as ActionType from './actions.js';

const INITIAL_STATE = {
  ui: {},
  entities: {
    reducedBoard: [],
    playerPieces: {}
  }
};

function _setReducedBoard(state, reducedBoard) {
  return {
    ...state,
    entities: {
      ...state.entities,
      reducedBoard
    }
  };
}


function _setPlayerPieces(state, playerPieces) {
  return {
    ...state,
    entities: {
      ...state.entities,
      playerPieces
    }
  };
}


export const gp_board = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.SET_REDUCED_BOARD:
      return _setReducedBoard(state, action.reducedBoard);
    case ActionType.SET_PLAYER_PIECES:
      return _setPlayerPieces(state, action.playerPieces);
    case ActionType.MOVE_PLAYER_PIECE.SUCCESS:
      state = _setPlayerPieces(state, action.playerPieces);
      return _setReducedBoard(state, action.reducedBoard);
    default:
      return state;
  }
};
