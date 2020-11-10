import firebaseInstance from "../utils/firebaseInstance";


class DocumentService {
    constructor() {
        this.documentRef = firebaseInstance.firebase.firestore().collection("documents");
        this.storageRef = firebaseInstance.firebase.storage().ref()
    }

    updateDoc=async (id,cno, description)=>{
       return await this.documentRef.doc(id)
            .update({cno,description, updated_at: new Date()})
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

    deleteFile=async(id)=>{
        return await this.storageRef.child(id).delete();
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
    getDocument= async id=>{
        return await this.documentRef.doc(id).get();
    }
    downloadFile=async id=>{
        return await this.storageRef.child(id).getDownloadURL();
    }
}

export const documentService = new DocumentService();
