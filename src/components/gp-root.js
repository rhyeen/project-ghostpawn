import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../state/store.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { Log } from '../../internal_comps/gp_shared/src/services/logger.js';

import { GpSharedStyles } from '../../internal_comps/gp_shared/src/entities/gp-shared-styles.js';

import { navigate } from '../state/actions.js';

import * as RootSelector from '../state/selectors.js';

import { ROUTES } from '../entities/root.js';
import './gp-404.js';
import { LOCALE_EN } from '../../internal_comps/gp_locale/src/entities/en.js';

class GpRoot extends connect(localStore)(LitElement) {
  render() {
    return html`
    ${GpSharedStyles}
    <style>
      :host {
        display: block;
      }
    </style>
    
    ${this._activePageHtml()}
    `;
  }

  static get properties() {
    return {
      _page: { type: String }
    }
  }

  _activePageHtml() {
    switch (this._page) {
      case ROUTES.PAGES.GAME:
        return html`<gp-game></gp-game>`;
      default:
        return html`<gp-404></gp-404>`;
    }
  }

  firstUpdated() {
    installRouter((location) => localStore.dispatch(navigate(decodeURIComponent(location.pathname))));
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {      
      updateMetadata({
        title: this._getPageTitle(this._page)
      });
    }
  }

  _getPageTitle(page) {
    const title = LOCALE_EN.GP_ROOT.TITLE.APP_NAME;
    switch (page) {
      case ROUTES.PAGES.GAME:
        return `${title} | ${LOCALE_EN.GP_ROOT.TITLE.PLAY}`;
      case ROUTES.PAGES.NOT_FOUND:
        return `${title} | ${LOCALE_EN.GP_ROOT.TITLE.NOT_FOUND}`;
      default:
        Log.error(`Unexpected page: ${page}`);
        return title;
    }
  }

  stateChanged(state) {
    this._page = RootSelector.getActivePage(state);
  }
}

window.customElements.define('gp-root', GpRoot);
