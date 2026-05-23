import * as admin from 'firebase-admin';

/**
 * Initialise the Firebase Admin SDK once.
 *
 * Priority:
 *  1. FIREBASE_SERVICE_ACCOUNT_JSON  (single JSON blob — takes precedence)
 *  2. FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY  (separate env vars — already in .env.local)
 *  3. Application Default Credentials  (Firebase App Hosting / GCP)
 */
function initAdminApp(): admin.app.App {
  if (admin.apps.length > 0) {
    return admin.apps[0]!;
  }

  // Option 1: full service account JSON blob
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (serviceAccountJson) {
    try {
      const serviceAccount = JSON.parse(serviceAccountJson);
      return admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    } catch (e) {
      console.error('[firebase-admin] Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON:', e);
    }
  }

  // Option 2: individual credential env vars (already set in .env.local)
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (clientEmail && privateKey && projectId) {
    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }

  // Option 3: Application Default Credentials (works on Firebase App Hosting & GCP)
  console.warn('[firebase-admin] Falling back to Application Default Credentials.');
  return admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const adminApp = initAdminApp();
export const adminAuth = adminApp.auth();
export const adminDb = adminApp.firestore();
