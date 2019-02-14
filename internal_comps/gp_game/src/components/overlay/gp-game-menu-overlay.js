import { LitElement, html } from '@polymer/lit-element';
import { GpSharedStyles } from '../../../../gp_shared/src/entities/gp-shared-styles.js';
import { GpOverlaySharedStyle } from './gp-overlay-shared-style.js';

import { localStore } from '../../state/store.js';

import {
  hideInGameMenu,
  resetGame
} from '../../state/actions.js';

import '../../../../gp_shared/src/components/gp-btn.js';

import { BTN_TYPES } from '../../../../gp_shared/src/entities/gp-btn-types.js';
import { LOCALE_EN } from '../../../../gp_locale/src/entities/en.js';

export class GpGameMenuOverlay extends LitElement {
  render() {
    return html`
      ${GpSharedStyles}
      ${GpOverlaySharedStyle}
      <gp-btn
          .btntype="${BTN_TYPES.GENERIC.WARNING}"
          @click="${() => this._resetGame()}">
        ${LOCALE_EN.GP_BTN.OTHER.RESET_GAME}</gp-btn>
      <gp-btn
          .btntype="${BTN_TYPES.PRESET.BACK}"
          @click="${() => this._cancel()}">
        ${LOCALE_EN.GP_BTN.PRESET.BACK}</gp-btn>
    `
  }

  _cancel() {
    localStore.dispatch(hideInGameMenu());
  }

  _resetGame() {
    localStore.dispatch(resetGame.request());
  }
}

window.customElements.define('gp-game-menu-overlay', GpGameMenuOverlay);
