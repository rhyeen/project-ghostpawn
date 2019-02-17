const COMPONENT_TAG = 'SR_BOARD';

/**
 * Base structure derived from: 
 * https://github.com/redux-saga/redux-saga/blob/master/examples/real-world/_actions/index.js
 */
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function _createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${COMPONENT_TAG}_${base}_${type}`;
		return acc;
	}, {})
}

function _createRequestRaw(base) {
  return `${COMPONENT_TAG}_${base}`;
}

function _action(type, payload = {}) {
  return {type, ...payload};
}


export const SET_REDUCED_BOARD =  _createRequestRaw('SET_REDUCED_BOARD');
export const setReducedBoard = (reducedBoard) => _action(SET_REDUCED_BOARD, {reducedBoard});

export const SET_PLAYER_PIECES =  _createRequestRaw('SET_PLAYER_PIECES');
export const setPlayerPieces = (playerPieces) => _action(SET_PLAYER_PIECES, {playerPieces});


export const MOVE_PLAYER_PIECE = _createRequestTypes('MOVE_PLAYER_PIECE');
export const movePlayerPiece = {
  request: (currentY, currentX, newY, newX) => _action(MOVE_PLAYER_PIECE.REQUEST, {currentY, currentX, newY, newX}),
  success: (playerPieces, reducedBoard) => _action(MOVE_PLAYER_PIECE.SUCCESS, {playerPieces, reducedBoard})
};
