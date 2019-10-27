import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';
import {from} from 'rxjs';

const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID
};

const operators = {
    gte: '>=',
    gt: '>',
    lt: '<',
    lte: '<=',
    contains: 'array-contains'
};

class FirestoreApi {
    constructor() {
        this.app = firebase.initializeApp(config);
        this.db = firebase.firestore();
        this.auth = firebase.auth();
        this.storage = firebase.storage();
        this.functions = firebase.functions();
    }
    get(path, {filters = null, orderBy = null, limit = 0}) {
        let docs = path.split('/');
        let query = this.db.collection(docs.shift());
        if (docs.length) docs.forEach(doc => (query = query.doc(doc)));
        if (filters) {
            Object.keys(filters).forEach(name => {
                let operator;
                if (typeof filters[name] === 'object') {
                    operator = Object.keys(filters[name])[0];
                    query = query.where(
                        name,
                        operators[operator],
                        filters[name][operator]
                    );
                } else {
                    operator = '==';
                    query = query.where(name, operator, filters[name]);
                }
            });
        }
        if (orderBy) {
            Object.keys(orderBy).forEach(property => {
                query = query.orderBy(property, orderBy[property]);
            });
        }
        if (limit > 0) {
            query = query.limit(limit);
        }
        return from(
            query.get().then(querySnapshot => {
                if (querySnapshot.exists) {
                    return {
                        id: querySnapshot.id,
                        ...querySnapshot.data()
                    };
                } else {
                    let data = [];
                    querySnapshot.forEach(function(doc) {
                        data.push({id: doc.id, ...doc.data()});
                    });
                    return data;
                }
            })
        );
    }
    post(path, form, hasId = false) {
        let docs = path.split('/');
        let query = this.db.collection(docs.shift());
        if (docs.length) docs.forEach(doc => (query = query.doc(doc)));
        if (hasId) {
            return from(query.set(form));
        } else {
            return from(query.add(form));
        }
    }
    put(path, form) {
        let docs = path.split('/');
        let query = this.db.collection(docs.shift());
        if (docs.length) docs.forEach(doc => (query = query.doc(doc)));
        return from(query.update(form));
    }
    delete(path, id) {
        let docs = path.split('/');
        let query = this.db.collection(docs.shift());
        if (docs.length) docs.forEach(doc => (query = query.doc(doc)));
        return from(query.delete());
    }
}
const api = new FirestoreApi();
export default api;
