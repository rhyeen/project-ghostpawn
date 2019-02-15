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
          width: 30px;
          height: 30px;
          border: 2px solid ${this._getBorderColor()};
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
      showValidMove: { type: Boolean },
      isSelected: { type: Boolean }
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
      case GAME_KEYWORDS.PAWN:
        return this._getCellIcon(opacity, PawnIcon, this.cell.playerPiece === GAME_KEYWORDS.PAWN);
      case GAME_KEYWORDS.KNIGHT:
        return this._getCellIcon(opacity, KnightIcon, this.cell.playerPiece === GAME_KEYWORDS.KNIGHT);
      case GAME_KEYWORDS.ROOK:
        return this._getCellIcon(opacity, RookIcon, this.cell.playerPiece === GAME_KEYWORDS.ROOK);
      case GAME_KEYWORDS.BISHOP:
        return this._getCellIcon(opacity, BishopIcon, this.cell.playerPiece === GAME_KEYWORDS.BISHOP);
      case GAME_KEYWORDS.KING:
        return this._getCellIcon(opacity, KingIcon, this.cell.playerPiece === GAME_KEYWORDS.KING);
      case GAME_KEYWORDS.QUEEN:
        return this._getCellIcon(opacity, QueenIcon, this.cell.playerPiece === GAME_KEYWORDS.QUEEN);
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
    return html`
      <div
        style="opacity: ${opacity};"
        board-cell>${iconFunction([teamClass, isPlayerPieceClass].join(' '))}</div>`;
  }

  _getTotalPiecesOnCell() {
    return (
      this.cell[GAME_KEYWORDS.PAWN] + 
      this.cell[GAME_KEYWORDS.ROOK] + 
      this.cell[GAME_KEYWORDS.BISHOP] + 
      this.cell[GAME_KEYWORDS.KNIGHT] + 
      this.cell[GAME_KEYWORDS.QUEEN] + 
      this.cell[GAME_KEYWORDS.KING]
    );
  }

  _getPiecesOnCell() {
    let piecesOnCell = [];
    if (this.cell[GAME_KEYWORDS.PAWN] > 0) {
      piecesOnCell.push({type: GAME_KEYWORDS.PAWN, count: this.cell[GAME_KEYWORDS.PAWN]});
    }
    if (this.cell[GAME_KEYWORDS.ROOK] > 0) {
      piecesOnCell.push({type: GAME_KEYWORDS.ROOK, count: this.cell[GAME_KEYWORDS.ROOK]});
    }
    if (this.cell[GAME_KEYWORDS.BISHOP] > 0) {
      piecesOnCell.push({type: GAME_KEYWORDS.BISHOP, count: this.cell[GAME_KEYWORDS.BISHOP]});
    }
    if (this.cell[GAME_KEYWORDS.KNIGHT] > 0) {
      piecesOnCell.push({type: GAME_KEYWORDS.KNIGHT, count: this.cell[GAME_KEYWORDS.KNIGHT]});
    }
    if (this.cell[GAME_KEYWORDS.QUEEN] > 0) {
      piecesOnCell.push({type: GAME_KEYWORDS.QUEEN, count: this.cell[GAME_KEYWORDS.QUEEN]});
    }
    if (this.cell[GAME_KEYWORDS.KING] > 0) {
      piecesOnCell.push({type: GAME_KEYWORDS.KING, count: this.cell[GAME_KEYWORDS.KING]});
    }
    return piecesOnCell;
  }

  _getBackgroundColor() {
    // if (this._isWhiteCell()) {
    //   if (this.showValidMove) {
    //     return '#f0f4c3';
    //   }
    //   if (this.isSelected) {
    //     return '#a1887f';
    //   }
    //   return '#FFF';
    // }
    // if (this.showValidMove) {
    //   return '#524c00';
    // }
    // if (this.isSelected) {
    //   return '#5d4037';
    // }
    // return '#222';
    if (this.showValidMove) {
      return this._isWhiteCell() ? '#7f0000' : '#ffcdd2';
    }
    if (this.isSelected) {
      return this._isWhiteCell() ? '#006064' : '#b2ebf2';
    }
    return this._isWhiteCell() ? '#FFF' : '#222';
  }

  _getBorderColor() {

    if (this.showValidMove) {
      return this._isWhiteCell() ? '#ffcdd2' : '#7f0000';
    }
    if (this.isSelected) {
      return this._isWhiteCell() ? '#b2ebf2' : '#006064';
    }
    return this._isWhiteCell() ? '#FFF' : '#222';
  }

  _isWhiteCell() {
    return (this.cellX + this.cellY) % 2 === 0;
  }
}

window.customElements.define('gp-board-cell', GpBoardCell);
