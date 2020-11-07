import firebaseInstance from "./firebaseInstance";


class AuthManager{

    constructor() {
        this.authRef = firebaseInstance.firebase.auth;
        this.authenticate = false;
    }

    login=(email,password,onSuccess,onFail)=>{
        this.authRef().signInWithEmailAndPassword(email, password)
            .then(value => onSuccess(value))
            .catch(reason =>onFail(reason) );
    }
    isAuthenticate = () => !!this.authRef().currentUser;

    signup=(email,password,onSuccess,onFail)=>{
        this.authRef().createUserWithEmailAndPassword(email,password)
            .then(value => onSuccess(value))
            .catch(reason => onFail(reason))
    }
}

export const authManager = new AuthManager();
