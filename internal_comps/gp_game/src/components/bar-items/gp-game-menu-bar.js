import { html, LitElement } from '@polymer/lit-element';
import { GpSharedStyles } from '../../../../gp_shared/src/entities/gp-shared-styles.js';
import { GpIconsStyles, MenuIcon } from '../../../../gp_shared/src/entities/gp-icons.js';

export class GpGameMenuBarItem extends LitElement {
  render() {
    return html`
    ${GpSharedStyles}
    ${GpIconsStyles}
    <div bar-item>${MenuIcon()}</div>
    `
  }
}

window.customElements.define('gp-game-menu-bar-item', GpGameMenuBarItem);
