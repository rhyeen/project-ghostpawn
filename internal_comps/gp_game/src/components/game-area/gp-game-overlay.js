import { LitElement, html } from '@polymer/lit-element';
import { GpSharedStyles, APP_COLORS } from '../../../../gp_shared/src/entities/gp-shared-styles.js';
import { GpGameStyles, NAV } from '../../entities/gp_game-styles.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';

import * as GameSelector from '../../state/selectors.js';
import { END_GAME_STATE } from '../overlay/gp-game-over-overlay.js';

import '../overlay/gp-game-menu-overlay.js';
import '../overlay/gp-game-over-overlay.js';

class GpGameOverlay extends connect(localStore)(LitElement) {
  render() {
    return html`
      ${GpSharedStyles}
      ${GpGameStyles}
      <style>
        .overlay {
          display: flex;
          justify-content: center;
          position: fixed;
          top: 0;
          width: 100vw;
          height: calc(100vh - var(${NAV.HEADER.HEIGHT}) - var(${NAV.FOOTER.HEIGHT}));
          background-color: var(${APP_COLORS.OVERLAY_WHITE});
          z-index: 1;
          padding: var(${NAV.HEADER.HEIGHT}) 0 var(${NAV.FOOTER.HEIGHT}) 0;
        }
      </style>
      ${this._getOverlayHtml()}
    `;
  }

  static get properties() { 
    return {
      _isGameMenuOpen: { type: Boolean },
      _hasWon: { type: Boolean },
      _hasLost: { type: Boolean }
    }
  }

  _getOverlayHtml() {
    let overlayInnerHtml = this._getOverlayInnerHtml();
    if (overlayInnerHtml) {
      return html`<div class="overlay">${overlayInnerHtml}</div>`;
    }
    return html``;
  }

  _getOverlayInnerHtml() {
    if (this._showGameMenuOverlay()) {
      return html`<gp-game-menu-overlay></gp-game-menu-overlay>`;
    }
    if (this._showGameOverOverlay()) {
      return html`
        <gp-game-over-overlay
            .endGameState="${this.hasWon ? END_GAME_STATE.WON : END_GAME_STATE.LOST }"></gp-game-over-overlay>`;
    }
    return null;
  }

  _showGameMenuOverlay() {
    return this._isGameMenuOpen;
  }

  _showGameOverOverlay() {
    return this._hasLost || this._hasWon;
  }

  stateChanged(state) {
    this._isGameMenuOpen = GameSelector.isGameMenuOpen(state);
    this._hasWon = GameSelector.hasWon(state);
    this._hasLost = GameSelector.hasLost(state);
  }
}

window.customElements.define('gp-game-overlay', GpGameOverlay);
