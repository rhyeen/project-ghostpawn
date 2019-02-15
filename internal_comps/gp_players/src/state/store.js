import { store } from 'intrastore/src/store.js';
import { gp_players } from './reducers.js';
import gp_playersSaga from './sagas.js';

store.addReducers({ gp_players });

store.runSaga(gp_playersSaga);

export const localStore = store;