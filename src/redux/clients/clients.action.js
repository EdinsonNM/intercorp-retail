import { createActions } from 'redux-actions';

export const CLIENTS_LOAD = 'CLIENTS_LOAD';
export const CLIENTS_LOAD_DONE = 'CLIENTS_LOAD_DONE';
export const CLIENTS_REGISTER = 'CLIENTS_REGISTER';
export const CLIENTS_REGISTER_DONE = 'CLIENTS_REGISTER_DONE';

const actionsCreator = createActions(
  {},
  CLIENTS_LOAD,
  CLIENTS_LOAD_DONE,
  CLIENTS_REGISTER,
  CLIENTS_REGISTER_DONE,
);
export const {
  clientsLoad,
  clientsLoadDone,
  clientsRegister,
  clientsRegisterDone,
} = actionsCreator;
