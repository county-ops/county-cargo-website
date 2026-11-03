import { NextRequest, NextResponse } from 'next/server';
import {
  validateCredentials,
  createSessionToken,
  ADMIN_COOKIE_CONFIG,
} from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body || {};

    const user = validateCredentials(username, password);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password. Please check your credentials.' },
        { status: 401 }
      );
    }

    const token = createSessionToken(user);
    const response = NextResponse.json({
      success: true,
      user: {
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set(ADMIN_COOKIE_CONFIG.name, token, ADMIN_COOKIE_CONFIG.options);
    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'An error occurred during authentication.' },
      { status: 500 }
    );
  }
}
