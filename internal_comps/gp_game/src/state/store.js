import { store } from 'intrastore/src/store.js';
import { gp_game } from './reducers.js';
import gp_gameSaga from './sagas.js';

store.addReducers({ gp_game });

store.runSaga(gp_gameSaga);

export const localStore = store;