import { ROUTES } from '../entities/root.js';

export const importActivePage = (activePage) => {
  switch (activePage) {
    case ROUTES.PAGES.GAME:
      import('../../internal_comps/gp_game/src/components/gp-game.js');
      break;
    default:
      activePage = ROUTES.PAGES.NOT_FOUND;
      break;
      // don't need to import, gp-root already does that.
  }
  return activePage;
}
