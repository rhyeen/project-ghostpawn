import { html } from '@polymer/lit-element';

export const GpOverlaySharedStyle = html`
<style>
  :host {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  [btn-group] {
    margin: 20px 0 40px 0;
  }

  [btn-group] gp-btn:first-child {
    margin-left: 0;
  }

  [btn-group] gp-btn {
    margin-left: 20px;
  }

  [btn-group].btn-group-fill-bottom-up {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: center;
    height: 100%;
    margin: 0;
  }

  gp-btn:first-child {
    margin-top: 0;
  }

  gp-btn {
    margin-top: 20px;
  }
</style>
`;
