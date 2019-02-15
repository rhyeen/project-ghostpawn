import { html, LitElement } from '@polymer/lit-element';
import { GpSharedStyles } from '../../../../gp_shared/src/entities/gp-shared-styles.js';
import { localStore } from '../../state/store.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

import './gp-board-cell.js';

import * as BoardSelector from '../../state/selectors.js';
import { getCombinedBoard } from '../../services/board-manipulator.js';
import { getValidMoves } from '../../services/move-validator.js';
import { GAME_KEYWORDS } from '../../../../gp_game/src/entities/game-keywords.js';

export class GpGameboard extends connect(localStore)(LitElement) {
  render() {
    return html`
      ${GpSharedStyles}
      <style>
        :host {
          border: 16px solid #222;
          margin: 20px;
        }

        [board-row] {
          display: flex;
        }
      </style>
      ${this._getBoardHtml()}
    `
  }

  static get properties() { 
    return {
      _combinedBoard: { type: Array },
      _validMoves: { type: Array }
    }
  }

  _getBoardHtml() {
    return this._combinedBoard.map((boardRow, index) => html`<div board-row>${this._getBoardRowHtml(boardRow, index)}</div>`);
  }

  _getBoardRowHtml(boardRow, boardRowIndex) {
    return boardRow.map((boardCell, boardCellIndex) => html`<gp-board-cell .cell="${boardCell}" .cellX="${boardRowIndex}" .cellY="${boardCellIndex}" ?showValidMove="${this._isInValidMoves(boardRowIndex, boardCellIndex)}" @click="${() => this._handleCellClick(boardCell, boardRowIndex, boardCellIndex)}"></gp-board-cell>`);
  }

  _handleCellClick(cell, x, y) {
    if (!cell.playerPiece) {
      this._validMoves = [];
      return;
    }
    // @DEBUG: get player team dynamically.
    this._validMoves = getValidMoves(GAME_KEYWORDS.WHITE_TEAM, cell.playerPiece, x, y, this._combinedBoard);
  }

  _isInValidMoves(x, y) {
    if (!this._validMoves) {
      return false;
    }
    for (let validMove of this._validMoves) {
      if (validMove.x === x && validMove.y === y) {
        return true;
      }
    }
    return false;
  }

  stateChanged(state) {
    let reducedBoard = BoardSelector.getReducedBoard(state);
    let playerPieces = BoardSelector.getPlayerPieces(state);
    this._combinedBoard = getCombinedBoard(reducedBoard, playerPieces);
  }
}

window.customElements.define('gp-gameboard', GpGameboard);
