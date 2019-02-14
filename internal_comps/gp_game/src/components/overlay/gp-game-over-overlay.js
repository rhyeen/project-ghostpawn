import { LitElement, html } from '@polymer/lit-element';
import { GpSharedStyles } from '../../../../gp_shared/src/entities/gp-shared-styles.js';
import { GpOverlaySharedStyle } from './gp-overlay-shared-style.js';

import { localStore } from '../../state/store.js';
import { resetGame } from '../../state/actions.js';

import '../../../../gp_shared/src/components/gp-btn.js';

import { BTN_TYPES } from '../../../../gp_shared/src/entities/gp-btn-types.js';
import { LOCALE_EN } from '../../../../gp_locale/src/entities/en.js';
import { Log } from '../../../../gp_shared/src/services/logger.js';

export const END_GAME_STATE = {
  WON: 'won',
  LOST: 'lost'
};

export class GpGameOverOverlay extends LitElement {
  render() {
    return html`
      ${GpSharedStyles}
      ${GpOverlaySharedStyle}
      <div>${this._endGameTextHtml()}</div>
      <gp-btn
          .btntype="${BTN_TYPES.GENERIC.WARNING}"
          @click="${() => this._resetGame()}">
        ${LOCALE_EN.GP_BTN.OTHER.RESET_GAME}</gp-btn>
    `
  }

  static get properties() { 
    return {
      endGameState: { type: String }
    }
  }

  _endGameTextHtml() {
    switch (this.endGameState) {
      case END_GAME_STATE.WON:
        return LOCALE_EN.GP_BTN.OTHER.GAME_WON;
      case END_GAME_STATE.LOST:
        return LOCALE_EN.GP_BTN.OTHER.GAME_LOST;
      default:
        return Log.error(`Unexpected endGameState: ${this.endGameState}`);
    }
  }

  _resetGame() {
    localStore.dispatch(resetGame.request());
  }
}

window.customElements.define('gp-game-over-overlay', GpGameOverOverlay);
