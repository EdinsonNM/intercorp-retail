import { combineEpics } from 'redux-observable';
import ClientsEpics from './clients/clients.epic';

export default combineEpics(ClientsEpics);
