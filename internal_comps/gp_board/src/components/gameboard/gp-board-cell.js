import { html, LitElement } from '@polymer/lit-element';
import { GpSharedStyles } from '../../../../gp_shared/src/entities/gp-shared-styles.js';
import { PawnIcon, KnightIcon, BishopIcon, RookIcon, QueenIcon, KingIcon, GpIconsStyles } from '../../../../gp_shared/src/entities/gp-icons.js';
import { Log } from '../../../../gp_shared/src/services/logger.js';
import { GAME_KEYWORDS } from '../../../../gp_game/src/entities/game-keywords.js';

export class GpBoardCell extends LitElement {
  render() {
    return html`
      ${GpSharedStyles}
      ${GpIconsStyles}
      <style>
        :host {
          display: flex;
          width: 34px;
          height: 34px;
          align-items: center;
          justify-content: center;
          background-color: ${this._getBackgroundColor()};
        }

        [svg-icon].white-team {
          fill: #1e88e5;
        }

        [svg-icon].white-team.player-piece {
          fill: #00acc1;
        }

        [svg-icon].black-team {
          fill: #e53935;
        }

        [board-cell] {
          height: 24px;
        }
      </style>
      ${this._getBoardCellHtml()}
    `;
  }

  static get properties() { 
    return {
      cell: { type: Object },
      cellX: { type: Number },
      cellY: { type: Number },
      showValidMove: { type: Boolean }
    }
  }

  _getBoardCellHtml() {
    let totalPieces = this._getTotalPiecesOnCell();
    if (totalPieces === 0) {
      return html``;
    }
    let piecesOnCell = this._getPiecesOnCell();
    return piecesOnCell.map((piece, pieceIndex) => this._getCellPieceHtml(piece, pieceIndex, piecesOnCell.length, totalPieces));
  }

  _getCellPieceHtml(piece, pieceTypeIndex, totalPieceTypes, totalPieces) {
    let opacity = piece.count / totalPieces;
    switch (piece.type) {
      case 'pawn':
        return this._getCellIcon(opacity, PawnIcon, this.cell.playerPiece === 'pawn');
      case 'knight':
        return this._getCellIcon(opacity, KnightIcon, this.cell.playerPiece === 'knight');
      case 'rook':
        return this._getCellIcon(opacity, RookIcon, this.cell.playerPiece === 'rook');
      case 'bishop':
        return this._getCellIcon(opacity, BishopIcon, this.cell.playerPiece === 'bishop');
      case 'king':
        return this._getCellIcon(opacity, KingIcon, this.cell.playerPiece === 'king');
      case 'queen':
        return this._getCellIcon(opacity, QueenIcon, this.cell.playerPiece === 'queen');
      default:
        Log.error(`unexpected piece type: ${piece.type}`);
        return html``;
    }
  }

  _getCellIcon(opacity, iconFunction, isPlayerPiece) {
    let teamClass = this.cell.team === GAME_KEYWORDS.WHITE_TEAM ? 'white-team' : 'black-team';
    let isPlayerPieceClass = isPlayerPiece ? 'player-piece' : '';
    if (isPlayerPieceClass) {
      opacity = 1;
    }
    return html`<div style="opacity: ${opacity};" board-cell>${iconFunction([teamClass, isPlayerPieceClass].join(' '))}</div>`;
  }

  _getTotalPiecesOnCell() {
    return this.cell.pawn + this.cell.rook + this.cell.bishop + this.cell.knight + this.cell.queen + this.cell.king;
  }

  _getPiecesOnCell() {
    let piecesOnCell = [];
    if (this.cell.pawn > 0) {
      piecesOnCell.push({type: 'pawn', count: this.cell.pawn});
    }
    if (this.cell.rook > 0) {
      piecesOnCell.push({type: 'rook', count: this.cell.rook});
    }
    if (this.cell.bishop > 0) {
      piecesOnCell.push({type: 'bishop', count: this.cell.bishop});
    }
    if (this.cell.knight > 0) {
      piecesOnCell.push({type: 'knight', count: this.cell.knight});
    }
    if (this.cell.queen > 0) {
      piecesOnCell.push({type: 'queen', count: this.cell.queen});
    }
    if (this.cell.king > 0) {
      piecesOnCell.push({type: 'king', count: this.cell.king});
    }
    return piecesOnCell;
  }

  _getBackgroundColor() {
    return (this.cellX + this.cellY) % 2 === 0 ? '#FFF' : '#222';
  }
}

window.customElements.define('gp-board-cell', GpBoardCell);
