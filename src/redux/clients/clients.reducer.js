import { handleActions } from 'redux-actions';
import initialState from './clients.state';

const ClientsReducer = handleActions(
  {
    CLIENTS_LOAD: (state, action) => ({ ...state }),
    CLIENTS_LOAD_DONE: {
      next: (state, { payload }) => ({ ...state, clients: payload }),
      throw: (state, { payload }) => ({ ...state, error: payload }),
    },
  },
  initialState,
);

export default ClientsReducer;
