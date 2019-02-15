import { html, LitElement } from '@polymer/lit-element';
import { GpSharedStyles } from '../../../../gp_shared/src/entities/gp-shared-styles.js';

export class GpBoardCell extends LitElement {
  render() {
    return html`
      ${GpSharedStyles}
      <style>
        :host {
          display: flex;
          width: 34px;
          height: 34px;
          align-items: center;
          justify-content: center;
          background-color: ${this._getBackgroundColor()};
        }
      </style>
    `
  }

  static get properties() { 
    return {
      cell: { type: Object },
      cellX: { type: Number },
      cellY: { type: Number },
      showValidMove: { type: Boolean }
    }
  }

  _getBackgroundColor() {
    return (this.cellX + this.cellY) % 2 === 0 ? 'white' : '#737373';
  }
}

window.customElements.define('gp-board-cell', GpBoardCell);
