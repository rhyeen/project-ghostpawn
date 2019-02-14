import { html } from '@polymer/lit-element';
import { APP_COLORS } from '../../../gp_shared/src/entities/gp-shared-styles.js';

export const NAV = {
  HEADER: {
    HEIGHT: '--gp_game-nav-header-height',
    BORDER: '--gp_game-nav-header-border'
  },
  FOOTER: {
    HEIGHT: '--gp_game-nav-footer-height',
    BORDER: '--gp_game-nav-footer-border'
  }
}

export const GpGameStyles = html`
<style>
  :host {
    --gp_game-nav-header-height: 46px;
    --gp_game-nav-footer-height: 46px;
    --gp_game-nav-header-border: 1px solid var(${APP_COLORS.NEAR_WHITE_BORDER});
    --gp_game-nav-footer-border: 1px solid var(${APP_COLORS.NEAR_WHITE_BORDER});
  }
</style>
`;
