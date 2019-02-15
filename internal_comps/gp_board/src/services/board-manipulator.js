export function getCombinedBoard(reducedBoard, playerPieces) {
  if (!reducedBoard.length) {
    return [];
  }
  let pieceTypes = Object.keys(playerPieces);
  if (!pieceTypes.length) {
    return reducedBoard;
  }
  let combinedBoard = shallowCopyBoard(reducedBoard);
  for (let pieceType of pieceTypes) {
    for (let piece of playerPieces[pieceType]) {
      combinedBoard[piece.x][piece.y].playerPiece = pieceType;
    }
  }
  return combinedBoard;
}

export function shallowCopyBoard(board) {
  let boardCopy = [];
  for (let boardRow of board) {
    let boardCopyRow = [];
    for (let boardCell of boardRow) {
      boardCopyRow.push({...boardCell});
    }
    boardCopy.push(boardCopyRow);
  }
  return boardCopy;
}