export const GAME_KEYWORDS = {
  WHITE_TEAM: 'WHITE',
  BLACK_TEAM: 'BLACK',
  WHITE_TEAM_CODE: 'W',
  BLACK_TEAM_CODE: 'B',
  PAWN: 'pawn',
  ROOK: 'rook',
  KNIGHT: 'knight',
  BISHOP: 'bishop',
  QUEEN: 'queen',
  KING: 'king'
}

export function getTeamPlayerCode(team, playerIndex) {
  return `${team === GAME_KEYWORDS.WHITE_TEAM ? GAME_KEYWORDS.WHITE_TEAM_CODE : GAME_KEYWORDS.BLACK_TEAM_CODE}${playerIndex}`;
}

export function isPlayerCodeWhiteTeam(playerCode) {
  return playerCode.startsWith(GAME_KEYWORDS.WHITE_TEAM_CODE);
}

export function getPlayerCodeTeam(playerCode) {
  return isPlayerCodeWhiteTeam(playerCode) ? GAME_KEYWORDS.WHITE_TEAM : GAME_KEYWORDS.BLACK_TEAM;
}

export function isPlayerCodeBlackTeam(playerCode) {
  return playerCode.startsWith(GAME_KEYWORDS.BLACK_TEAM_CODE);
}