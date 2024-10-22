import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    console.log(docRef);
  } catch (err) {
    console.log("Write to DB ", err);
  }
}

export async function deleteFromDB(deletedId, collectionName) {
  try {
    await deleteDoc(doc(database, collectionName, deletedId));
  } catch (err) {
    console.log("Delete from DB ", err);
  }
}

export async function updateInDB(data, docId, collectionName) {
  try {
    await updateDoc(doc(database, collectionName, docId), data);
  } catch (err) {
    console.log("Update in DB ", err);
  }
}