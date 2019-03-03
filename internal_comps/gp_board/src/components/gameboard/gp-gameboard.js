import { html, LitElement } from '@polymer/lit-element';
import { GpSharedStyles } from '../../../../gp_shared/src/entities/gp-shared-styles.js';
import { localStore } from '../../state/store.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

import './gp-board-cell.js';

import { movePlayerPiece } from '../../state/actions.js';

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
          border: 8px solid #6d4c41;
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
      _selectedCell: { type: Object },
      _validMoves: { type: Array }
    }
  }

  _getBoardHtml() {
    return this._combinedBoard.map((boardRow, index) => html`<div board-row>${this._getBoardRowHtml(boardRow, index)}</div>`);
  }

  _getBoardRowHtml(boardRow, boardRowIndex) {
    return boardRow.map((boardCell, boardCellIndex) => {
      return html`
        <gp-board-cell
            .cell="${boardCell}"
            .cellY="${boardRowIndex}"
            .cellX="${boardCellIndex}"
            ?showValidMove="${this._isInValidMoves(boardRowIndex, boardCellIndex)}"
            ?isSelected="${this._isSelected(boardRowIndex, boardCellIndex)}"
            @click="${() => this._handleCellClick(boardCell, boardRowIndex, boardCellIndex)}"></gp-board-cell>`
    });
  }

  _handleCellClick(cell, y, x) {
    if (!cell.playerPiece) {
      if (this._selectedCell.playerPiece && this._isInValidMoves(y, x)) {
        localStore.dispatch(movePlayerPiece.request(this._selectedCell.y, this._selectedCell.x, y, x));
      }
      this._selectedCell = {};
      this._validMoves = [];
      return;
    }
    this._selectedCell = { x, y, playerPiece: cell.playerPiece };
    this._validMoves = getValidMoves(x, y, this._combinedBoard);
  }

  _isSelected(y, x) {
    return this._selectedCell && this._selectedCell.x === x && this._selectedCell.y === y;
  }

  _isInValidMoves(y, x) {
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
