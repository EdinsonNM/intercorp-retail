import FirestoreApi from './firestore';
export default class ClientApi {
    static entity = 'clients';
    static getAll = () => FirestoreApi.get(ClientApi.entity, {});
    static post = ({firstname, lastname, birthday}) =>
        FirestoreApi.post(ClientApi.entity, {firstname, lastname, birthday});
}
