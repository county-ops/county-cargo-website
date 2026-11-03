import crypto from 'crypto';
import { cookies } from 'next/headers';

export interface AdminUser {
  username: string;
  name: string;
  role: 'admin' | 'agent';
}

export interface SessionPayload {
  username: string;
  name: string;
  role: 'admin' | 'agent';
  iat: number;
  exp: number;
}

const COOKIE_NAME = 'cc_admin_session';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'countycargo-admin-secret-2026-secure-key';

// Default credentials - can also be customized via environment variables
export const ADMIN_CREDENTIALS = {
  admin: {
    username: 'admin',
    password: process.env.ADMIN_PASSWORD || 'CountyCargo2026!Admin',
    name: 'County Cargo Administrator',
    role: 'admin' as const,
  },
  agent: {
    username: 'agent',
    password: process.env.AGENT_PASSWORD || 'CountyCargo2026!Agent',
    name: 'County Cargo Agent',
    role: 'agent' as const,
  },
};

export function validateCredentials(usernameInput: string, passwordInput: string): AdminUser | null {
  const normalizedUser = (usernameInput || '').trim().toLowerCase();
  const password = (passwordInput || '').trim();

  if (!normalizedUser || !password) return null;

  // Check admin
  if (
    (normalizedUser === 'admin' || normalizedUser === 'admin@countycargo.com') &&
    password === ADMIN_CREDENTIALS.admin.password
  ) {
    return {
      username: 'admin',
      name: ADMIN_CREDENTIALS.admin.name,
      role: 'admin',
    };
  }

  // Check agent
  if (
    (normalizedUser === 'agent' || normalizedUser === 'agent@countycargo.com') &&
    password === ADMIN_CREDENTIALS.agent.password
  ) {
    return {
      username: 'agent',
      name: ADMIN_CREDENTIALS.agent.name,
      role: 'agent',
    };
  }

  return null;
}

function sign(payloadStr: string): string {
  return crypto.createHmac('sha256', SESSION_SECRET).update(payloadStr).digest('hex');
}

export function createSessionToken(user: AdminUser): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    username: user.username,
    name: user.name,
    role: user.role,
    iat: now,
    exp: now + 7 * 24 * 60 * 60, // 7 days
  };

  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = sign(payloadStr);
  return `${payloadStr}.${signature}`;
}

export function verifySessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;

  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [payloadStr, signature] = parts;
    const expectedSig = sign(payloadStr);

    if (
      signature.length !== expectedSig.length ||
      !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))
    ) {
      return null;
    }

    const json = Buffer.from(payloadStr, 'base64').toString('utf-8');
    const payload: SessionPayload = JSON.parse(json);

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function getCurrentAdminSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    return verifySessionToken(token);
  } catch {
    return null;
  }
}

export const ADMIN_COOKIE_CONFIG = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  },
};
