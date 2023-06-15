// Import the functions you need from the SDKs you need
import { getStorage, ref, uploadBytes, getDownloadURL, getBytes } from 'firebase/storage'
import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, getDoc, doc, query, where, setDoc, deleteDoc, getDocs } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_FIREBASE,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
}


// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)

export async function getConversation() {
    try {
        const converCollection = collection(db, 'conversations')
        const converSnapshot = await getDocs(converCollection)
        const converList = converSnapshot.docs.map(doc => doc.data())
        //console.log(converList)
        return converList
    } catch (error) {
        console.error(error)
    }
}

export async function updateConversation(conversation) {
    try {
        //const collectionRef = collection(db, 'conversations', conversation.id)
        const docRef = doc(db, 'conversations', conversation.id)
        await setDoc(docRef, conversation)
    } catch (error) {
        console.error(error)
    }
}

export async function getProfilePhotoUrl(profilePicture) {
    try {
        const imageRef = ref(storage, profilePicture)
        const url = await getDownloadURL(imageRef)
        return url
    } catch (error) {

    }
}