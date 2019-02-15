const WHITE_TEAM = 'WHITE';
const BLACK_TEAM = 'BLACK';

const GAME_PIECE = {
  ROOK: 'rook',
  KNIGHT: 'knight',
  BISHOP: 'bishop',
  QUEEN: 'queen',
  KING: 'king',
  PAWN: 'pawn'
};

/**
  returns an array of `{ x: <0-7>, y: <0-7> }` elements, where each element is a valid move for the given piece based on the given board.

  pieceTeam: the team of piece, either WHITE_TEAM or BLACK_TEAM.
  pieceType: the type of the piece, one of the values from GAME_PIECE.
  pieceX: the x (row) coordinate of the piece.
  pieceY: the y (column) coordinate of the piece.
  board: the state of the board.  Of the following format:
  [
      [
          {
              "team": "BLACK", // which team is on this space
              "playerPiece": "pawn", // undefined if the player does not have a piece here, otherwise, one of the values from GAME_PIECE. 
              "pawn": 0,
              "rook": 50, // number of this type of piece on that cell. Only matters if it's 0 or > 0.
              "bishop": 0,
              "knight": 0,
              "queen": 0,
              "king": 0
          },
          ...
      ],
      ...
  ]
*/
export function getValidMoves(pieceTeam, pieceType, pieceX, pieceY, board) {
  debugger;
  return [];
}
