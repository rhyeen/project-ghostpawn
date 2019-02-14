import { html, LitElement } from '@polymer/lit-element';
import { GpSharedStyles } from '../../../../gp_shared/src/entities/gp-shared-styles.js';

import { localStore } from '../../state/store.js';

import '../bar-items/gp-game-menu-bar.js';
import { showInGameMenu } from '../../state/actions.js';
import { GpGameStyles, NAV } from '../../entities/gp_game-styles.js';

export class GpGameHeader extends LitElement {
  render() {
    return html`
    ${GpSharedStyles}
    ${GpGameStyles}
    <style>
      [bar-items] {
        top: 0;
        border-bottom: var(${NAV.HEADER.BORDER});
        height: var(${NAV.HEADER.HEIGHT});
      }
    </style>
    <div bar-items>
      <div class="item-group left-items"></div>

      <div class="item-group right-items">
        <gp-game-menu-bar-item @click="${() => this._openMenu()}"></gp-game-menu-bar-item>
      </div>
    </div>
    `
  }

  _openMenu() {
    localStore.dispatch(showInGameMenu());
  }
}

window.customElements.define('gp-game-header', GpGameHeader);
