import { LitElement, html } from '@polymer/lit-element';
import { GpSharedStyles } from '../../../gp_shared/src/entities/gp-shared-styles.js';
import { localStore } from '../state/store.js';

import { resetGame } from '../state/actions.js';

import './game-area/gp-game-footer.js';
import './game-area/gp-game-header.js';
import './game-area/gp-game-overlay.js';
import './game-area/gp-game-view.js';

class GpGame extends LitElement {
  render() {
    return html`
      <style>
        :host {
          height: 100vh;
          width: 100vw;
        }
      </style>
      ${GpSharedStyles}

      <gp-game-view></gp-game-view>
      <gp-game-header></gp-game-header>
      <gp-game-footer></gp-game-footer>
      <gp-game-overlay></gp-game-overlay>
    `;
  }

  constructor() {
    super();
    if (!this.gameId) {
      localStore.dispatch(resetGame.request());
    }
  }

  static get properties() { 
    return {
      gameId: { type: String }
    }
  }
}

window.customElements.define('gp-game', GpGame);
