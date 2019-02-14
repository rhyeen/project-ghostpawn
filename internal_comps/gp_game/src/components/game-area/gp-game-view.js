import { html, LitElement } from '@polymer/lit-element';
import { GpSharedStyles } from '../../../../gp_shared/src/entities/gp-shared-styles.js';
import { GpGameStyles, NAV } from '../../entities/gp_game-styles.js';

export class GpGameView extends LitElement {
  render() {
    return html`
      ${GpSharedStyles}
      ${GpGameStyles}
      <style>
        :host {
          display: flex;
          width: 100vw;
          margin-top: var(${NAV.HEADER.HEIGHT});
          height: calc(100vh - var(${NAV.HEADER.HEIGHT}) - var(${NAV.FOOTER.HEIGHT}));
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
      </style>
      <gp-gameboard></gp-gameboard>
    `
  }
}

window.customElements.define('gp-game-view', GpGameView);
