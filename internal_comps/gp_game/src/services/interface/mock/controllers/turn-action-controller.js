export const isValidTurn = (turn) => {
  for (let action of turn) {
    _isValidAction(action);
  }
}

export const executeTurnActions = (turn) => {
  for (let action of turn) {
    _executeAction(action);
  }
}

function _isValidAction(action) {
  
}

function _executeAction(action) {
  
}
