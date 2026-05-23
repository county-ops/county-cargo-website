import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstname,
      lastname,
      email,
      mobile,
      altmobile,
      companyname,
      deliveryaddress,
      city,
      state,
      zip,
      country,
      role,
      // Admin token for server-side auth verification
      idToken,
    } = body;

    // ── 1. Verify the caller is an Admin ─────────────────────────────────────
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Look up caller's role in Firestore
    const callerDoc = await adminDb.collection('users').doc(decodedToken.uid).get();
    if (!callerDoc.exists || callerDoc.data()?.role !== 'Admin') {
      return NextResponse.json({ error: 'Forbidden: Admin only' }, { status: 403 });
    }

    // ── 2. Validate required fields ───────────────────────────────────────────
    if (!firstname || !lastname || !email || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const validRoles = ['Customer', 'Staff', 'Agent', 'Business', 'Admin'];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // ── 3. Check for duplicate email ──────────────────────────────────────────
    try {
      const existing = await adminAuth.getUserByEmail(email);
      if (existing) {
        return NextResponse.json(
          { error: `An account with email ${email} already exists.` },
          { status: 409 }
        );
      }
    } catch (err: any) {
      // auth/user-not-found is expected — continue
      if (err.code !== 'auth/user-not-found') throw err;
    }

    // ── 4. Create the Firebase Auth user ──────────────────────────────────────
    // We don't set a password — user must use "Forgot Password" to set one.
    const authUser = await adminAuth.createUser({
      email,
      displayName: `${firstname} ${lastname}`,
      emailVerified: false,
    });

    // ── 5. Send password reset email (acts as "Set Password" / welcome link) ──
    try {
      await adminAuth.generatePasswordResetLink(email);
      // Note: In production, you'd send this via your email service.
      // Firebase will also send one automatically via the Auth console
      // if you have the email action configured.
    } catch (emailErr) {
      console.warn('[create-user] Password reset link generation failed:', emailErr);
    }

    // ── 6. Create Firestore profile ───────────────────────────────────────────
    const userProfile = {
      uid: authUser.uid,
      email,
      firstname,
      lastname,
      phone_number: mobile || '',
      phone2: altmobile || '',
      company: companyname || '',
      address: deliveryaddress || '',
      city: city || '',
      state: state || '',
      zipCode: zip || '',
      country: country || '',
      referrer: 'Admin Created',
      role,
      apiKey: '',
      testApiKey: '',
      webhookUrl: '',
      created_time: FieldValue.serverTimestamp(),
    };

    await adminDb.collection('users').doc(authUser.uid).set(userProfile);

    // ── 7. Set custom claim for role (optional, for security rules) ───────────
    await adminAuth.setCustomUserClaims(authUser.uid, { role });

    return NextResponse.json({
      success: true,
      uid: authUser.uid,
      email,
      role,
      message: `Account created. ${firstname} can use "Forgot Password" at the login page to set their password.`,
    });

  } catch (err: any) {
    console.error('[create-user API] Error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
