export const GAME_KEYWORDS = {
  WHITE_TEAM: 'WHITE',
  BLACK_TEAM: 'BLACK',
  WHITE_TEAM_CODE: 'W',
  BLACK_TEAM_CODE: 'B'
}

export function getTeamPlayerCode(team, playerIndex) {
  return `${team === GAME_KEYWORDS.WHITE_TEAM ? GAME_KEYWORDS.WHITE_TEAM_CODE : GAME_KEYWORDS.BLACK_TEAM_CODE}${playerIndex}`;
}

export function isPlayerCodeWhiteTeam(playerCode) {
  return playerCode.startsWith(GAME_KEYWORDS.WHITE_TEAM_CODE);
}

export function isPlayerCodeBlackTeam(playerCode) {
  return playerCode.startsWith(GAME_KEYWORDS.BLACK_TEAM_CODE);
}