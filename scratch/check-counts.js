
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');

// Try to find service account key
const serviceAccountPath = path.join(process.cwd(), '.firebase', 'studio-7985444708-3c482', 'serviceAccountKey.json');

if (!fs.existsSync(serviceAccountPath)) {
    console.error('Service account key not found at:', serviceAccountPath);
    process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function checkCounts() {
    try {
        const userCount = await db.collection('users').count().get();
        console.log('User Count:', userCount.data().count);
        
        const pkgCount = await db.collection('package_receipts').count().get();
        console.log('Package Receipt Count:', pkgCount.data().count);
        
        const shipmentCount = await db.collection('shipments').count().get();
        console.log('Shipment Count:', shipmentCount.data().count);
    } catch (error) {
        console.error('Error checking counts:', error);
    }
}

checkCounts();
