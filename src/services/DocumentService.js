import firebaseInstance from "../utils/firebaseInstance";


class DocumentService {
    constructor() {
        this.documentRef = firebaseInstance.firebase.firestore().collection("documents");
        this.storageRef = firebaseInstance.firebase.storage().ref()
    }

    addDoc = (cno, description, file,onSuccess,onFail) => {
        this.documentRef.doc(cno).set({cno, description})
            .then(val => {
                let task = this.storageRef.child(cno).put(file)
                task.on("state_changed", function (snapshot) {
                    console.log(snapshot);
                }, function (error) {
                    console.error(error)
                }, function () {
                    let downloadURL = task.snapshot.ref.fullPath
                    onSuccess({id:cno,cno,description})
                })
            })
            .catch(onerror => onFail(onerror.message))

    }
    updateDoc = (id, {cno, description}) => {
        this.documentRef.doc(id)
            .set({cno, description})
            .then(value => console.log(value))
            .catch(reason => console.error(reason));
    }
    deleteDoc = async(id) => {
        return await this.documentRef.doc(id).delete()
    }
    all=async ()=>{
       return await this.documentRef.get();
    }
    search=async id=>{
        return await this.documentRef.doc(id).get();
    }
}

export const documentService = new DocumentService();
