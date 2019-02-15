import { GAME_KEYWORDS } from "../../../gp_game/src/entities/game-keywords";

/**
  returns an array of `{ x: <0-7>, y: <0-7> }` elements, where each element is a valid move for the given piece based on the given board.

  pieceTeam: the team of piece, either GAME_KEYWORDS.WHITE_TEAM or GAME_KEYWORDS.BLACK_TEAM.
  pieceType: the type of the piece, one of the values from GAME_KEYWORDS.PAWN though .KING.
  pieceX: the x (column) coordinate of the piece.
  pieceY: the y (row) coordinate of the piece.
  board: the state of the board.  Of the following format:
  [
      [
          {
              "team": GAME_KEYWORDS.BLACK_TEAM, // which team is on this space
              "playerPiece": GAME_KEYWORDS.PAWN, // undefined if the player does not have a piece here, otherwise, one of the values from GAME_PIECE. 
              <GAME_KEYWORDS.PAWN>: 0, // where <GAME_KEYWORDS.PAWN> is actually "pawn", but you should always use the reference like so: `board[0][0][GAME_KEYWORDS.PAWN]` to ensure consistency across the product.
              <GAME_KEYWORDS.ROOK>: 50, // number of this type of piece on that cell. Only matters if it's 0 or > 0.
              <GAME_KEYWORDS.KNIGHT>: 0,
              <GAME_KEYWORDS.BISHOP>: 0,
              <GAME_KEYWORDS.QUEEN>: 0,
              <GAME_KEYWORDS.KING>: 0
          },
          ...
      ],
      ...
  ]
*/
export function getValidMoves(pieceTeam, pieceType, pieceX, pieceY, board) {
  debugger;
  return [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 4, y: 4 }, { x: 3, y: 4 }, { x: 3, y: 4 }, { x: 7, y: 7 }, { x: 6, y: 7 }];
}
