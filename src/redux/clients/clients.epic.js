import { ofType } from 'redux-observable'
import { switchMap, catchError, map, flatMap } from 'rxjs/operators';
import { of, merge, concat } from 'rxjs'

import {
    CLIENTS_LOAD,
    clientsRegisterDone,
    clientsLoad,
    clientsLoadDone,
    CLIENTS_REGISTER,
} from './clients.action';
import ClientApi from '../../api/client';
import { calculateAge } from '../../libs/custom-date';

const clientsLoadEpic = action$ =>
    action$.pipe(
        ofType(CLIENTS_LOAD),
        switchMap(({ payload }) =>
            ClientApi.getAll().pipe(
                map(clients => clients.map(client => ({...client, age: calculateAge( new Date(client.birthday.seconds * 1000)), fullname: `${client.firstname} ${client.lastname}`}))),
                map(clientsLoadDone),
                catchError(error => of(clientsLoadDone(error)))
            )
        )
    )

const clientsRegisterEpic = action$ =>
    action$.pipe(
        ofType(CLIENTS_REGISTER),
        switchMap(({ payload }) =>
            ClientApi.post(payload).pipe(
                flatMap(() =>
                    concat(of(clientsRegisterDone()), of(clientsLoad()))
                ),
                catchError(error => of(clientsRegisterDone(error)))
            )
        )
    )

export default function ClientsEpics(action$) {
    return merge(clientsLoadEpic(action$), clientsRegisterEpic(action$))
}
