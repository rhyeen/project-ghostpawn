import { LitElement, html } from '@polymer/lit-element';
import { GpSharedStyles } from '../../internal_comps/gp_shared/src/entities/gp-shared-styles.js';
import { LOCALE_EN } from '../../internal_comps/gp_locale/src/entities/en.js';

class Gp404 extends LitElement {
  render() {
    return html`
      ${GpSharedStyles}
      <style>
        :host {
          display: block;
          padding: 40px;
        }
      </style>
      <h1>${LOCALE_EN.GP_ROOT.PAGE_NOT_FOUND.P1}</h1>
      <h2>${LOCALE_EN.GP_ROOT.PAGE_NOT_FOUND.P2}</h2>
    `;
  }
}

window.customElements.define('gp-404', Gp404);
