import { html, svg } from '@polymer/lit-element';

export function BishopIcon(customClass) { return getBaseSvg(customClass, 'bishop-svg-icon', svg`<path d="M19 22H5v-2h14v2M17.16 8.26A8.94 8.94 0 0 1 19 13c0 2.76-3.13 5-7 5s-7-2.24-7-5c0-2.38 2.33-6.61 5.46-7.73-.3-.36-.46-.81-.46-1.27a2 2 0 0 1 2-2 2 2 0 0 1 2 2c0 .46-.16.91-.46 1.27.86.33 1.64.83 2.3 1.47l-4.55 4.55 1.42 1.42 4.45-4.45z"/>`) }
export function KingIcon(customClass) { return getBaseSvg(customClass, 'king-svg-icon', svg`<path d="M19 22H5v-2h14v2m-2-12c-1.42 0-2.74.77-3.45 2H13V7h3V5h-3V2h-2v3H8v2h3v5h-.55C9.35 10.09 6.9 9.43 5 10.54A4.013 4.013 0 0 0 3.5 16c.74 1.24 2.07 2 3.5 2h10a4 4 0 0 0 4-4 4 4 0 0 0-4-4z"/>`) }
export function KnightIcon(customClass) { return getBaseSvg(customClass, 'knight-svg-icon', svg`<path d="M19 22H5v-2h14v2M13 2c-1.25 0-2.42.62-3.11 1.66L7 8l2 2 2.06-1.37c.44-.31 1.08-.19 1.39.27.02.03.05.06.05.1.3.59.19 1.3-.28 1.77l-4.8 4.8c-.55.56-.55 1.46.01 2.01.26.26.62.42.99.42H17V6a4 4 0 0 0-4-4z"/>`) }
export function PawnIcon(customClass) { return getBaseSvg(customClass, 'pawn-svg-icon', svg`<path d="M19 22H5v-2h14v2m-3-4L13.2 7.74a2.99 2.99 0 0 0 1.54-3.95 2.988 2.988 0 0 0-3.95-1.54A2.988 2.988 0 0 0 9.25 6.2c.3.69.85 1.24 1.54 1.54L8 18h8z"/>`) }
export function QueenIcon(customClass) { return getBaseSvg(customClass, 'queen-svg-icon', svg`<path d="M18 3a2 2 0 0 1 2 2c0 .81-.5 1.5-1.17 1.82L17 13.15V18H7v-4.85L5.17 6.82C4.5 6.5 4 5.81 4 5a2 2 0 0 1 2-2 2 2 0 0 1 2 2c0 .5-.18.95-.5 1.3l2.8 3.05.53-3.73C10.33 5.26 10 4.67 10 4a2 2 0 0 1 2-2 2 2 0 0 1 2 2c0 .67-.33 1.26-.83 1.62l.53 3.73 2.77-3.06A2 2 0 0 1 16 5a2 2 0 0 1 2-2M5 20h14v2H5v-2z"/>`) }
export function RookIcon(customClass) { return getBaseSvg(customClass, 'rook-svg-icon', svg`<path d="M5 20h14v2H5v-2M17 2v3h-2V2h-2v3h-2V2H9v3H7V2H5v6h2v10h10V8h2V2h-2z"/>`) }
export function MenuIcon(customClass) { return getBaseSvg(customClass, 'menu-svg-icon', svg`<path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z"/>`) }

function getBaseSvg(customClass, definedClass, svgContent) {
  const classes = [definedClass, customClass].join(' ');
  return html`<svg class="${classes}" viewBox="0 0 24 24" svg-icon>${svgContent}</svg>`
}

export const GpIconsStyles = html`
<style>
  [svg-icon] {
    /** @DEBUG: defined as a const in gp-shared-styles, maybe we should keep them together? **/
    --gp_shared-default-svg-color: #212121;
    width: 24px;
    height: 24px;
    fill: var(--gp_shared-default-svg-color);
  }
</style>
`;