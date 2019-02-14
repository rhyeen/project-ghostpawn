import { html } from '@polymer/lit-element';

export const APP_COLORS = {
  NEAR_BLACK: '--gp_shared-near-black',
  NEAR_WHITE: '--gp_shared-near-white',
  BASE_WHITE: '--gp_shared-base-white',
  NEAR_WHITE_BORDER: '--gp_shared-near-white-border',
  OFF_BLACK: '--gp_shared-off-black',
  HINT_GRAY: '--gp_shared-hint-gray',
  OVERLAY_BLACK: '--gp_shared-overlay-black',
  OVERLAY_WHITE: '--gp_shared-overlay-white',
  OVERLAY_CARD_WHITE: '--gp_shared-overlay-card-white',
  SVG_DEFAULT: '--gp_shared-default-svg-color'
};

export const SHADOW_ELEVATIONS = {
  LEVEL_1: {
    BASE: '--gp_shared-elevation-1',
    INSET: '--gp_shared-elevation-n1',
    HOVER: '--gp_shared-elevation-h1'
  },
  SIDE_BAR: {
    BASE: '--gp_shared-elevation-side-bar'
  }
};

export const GpSharedStyles = html`
<style>
  :host {
    --gp_shared-near-black: #222426;
    --gp_shared-near-white: #F7FBFF;
    --gp_shared-base-white: #FFF;
    --gp_shared-near-white-border: #E7EBEF;
    --gp_shared-off-black: #525456;
    --gp_shared-hint-gray: #798183;
    
    --gp_shared-overlay-black: rgba(0, 0, 0, 0.5);
    --gp_shared-overlay-white: rgba(255, 255, 255, 0.8);
    --gp_shared-overlay-card-white: rgba(255, 255, 255, 0.5);

    --gp_shared-elevation-1: 1px 1px 5px rgba(0, 0, 0, 0.4);
    --gp_shared-elevation-n1: inset 1px 1px 5px rgba(0, 0, 0, 0.4);
    --gp_shared-elevation-h1:
      1px 1px 5px rgba(0, 0, 0, 0.4),
      inset 0px 0px 80px rgba(0, 0, 0, 0.1);
    --gp_shared-elevation-side-bar: -2px 0px 10px rgba(0, 0, 0, 0.1);
  }

  button:focus {
    outline: 0;
  }

  a:link, a:visited {
    text-decoration: none;
  }
</style>
`;
