import { store } from 'intrastore/src/store.js';
import { gp_board } from './reducers.js';
import gp_boardSaga from './sagas.js';

store.addReducers({ gp_board });

store.runSaga(gp_boardSaga);

export const localStore = store;