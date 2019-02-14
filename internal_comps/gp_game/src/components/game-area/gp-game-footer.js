import { LitElement, html } from '@polymer/lit-element';
import { GpSharedStyles } from '../../../../gp_shared/src/entities/gp-shared-styles.js';
import { GpGameStyles, NAV } from '../../entities/gp_game-styles.js';

export class GpGameFooter extends LitElement {
  render() {
    return html`
    ${GpSharedStyles}
    ${GpGameStyles}
    <style>
      [bar-items] {
        bottom: 0;
        border-top: var(${NAV.FOOTER.BORDER});
        height: var(${NAV.FOOTER.HEIGHT});
      }

      gp-discard-pile-bar-item,
      gp-lost-pile-bar-item {
        margin-left: 20px;
      }
    </style>
    <div bar-items>
      <div class="item-group left-items"></div>
      <div class="item-group right-items"></div>
    </div>
    `
  }
}

window.customElements.define('gp-game-footer', GpGameFooter);
