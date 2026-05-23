import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
const shipments = require('../../demo/shipments.json');
require('dotenv').config({ path: '.env.local' });

async function upload() {
    for (const shipment of shipments) {
        try {
            const docRef = await addDoc(collection(db, "shipments"), shipment);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}

upload();
