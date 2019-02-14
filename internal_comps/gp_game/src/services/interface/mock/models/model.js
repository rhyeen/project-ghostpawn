export const Model = _getInitialModel();

function _getInitialModel() {
  return {
    turnHistory: []
  };
}

export function initializeModel() {
  let model = _getInitialModel();
  Model.turnHistory = [...model.turnHistory];
}

export function recordPlayerTurn(turn) {
  Model.turnHistory.push(turn);
}

