import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';

export interface AdminUser {
  username: string;
  name: string;
  role: 'admin' | 'agent';
}

export interface StoredUser {
  username: string;
  name: string;
  passwordHash: string;
  role: 'admin' | 'agent';
  createdAt: string;
}

export interface SessionPayload {
  username: string;
  name: string;
  role: 'admin' | 'agent';
  iat: number;
  exp: number;
}

const COOKIE_NAME = 'cc_admin_session';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'cc-session-secret-salt-2026';

// Cryptographic SHA-256 hashes for initial verification (zero plaintext passwords in repository)
const ROOT_ADMIN_HASH = 'c2c9a6601d33beaf40f90c759d304dda5d27f476098842e01cc90e7f3a33408c';
const ROOT_AGENT_HASH = '1fde9c7c3742b9ce929220bd254eda81cc6986e5a159638c33fd971ef247aa0a';
const ROOT_API_KEY_HASH = 'ee25496ea25d37647f1339bb68868b74a2658cacd4e4bc36ce27cb5c51fd48a6';

const USERS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'admin-users.json');
let inMemoryUsers: StoredUser[] | null = null;

// Built-in system identities
export const ADMIN_CREDENTIALS = {
  admin: {
    username: 'admin',
    name: 'County Cargo Administrator',
    role: 'admin' as const,
  },
  agent: {
    username: 'agent',
    name: 'County Cargo Agent',
    role: 'agent' as const,
  },
};

function sha256(val: string): string {
  return crypto.createHash('sha256').update(val).digest('hex');
}

function hashPassword(password: string): string {
  return crypto.createHmac('sha256', SESSION_SECRET).update(password).digest('hex');
}

export function getStoredUsers(): StoredUser[] {
  if (inMemoryUsers !== null) {
    return inMemoryUsers;
  }

  try {
    if (fs.existsSync(USERS_FILE_PATH)) {
      const data = fs.readFileSync(USERS_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        inMemoryUsers = parsed;
        return inMemoryUsers;
      }
    }
  } catch (err) {
    console.error('Error reading admin-users.json:', err);
  }

  inMemoryUsers = [];
  return inMemoryUsers;
}

export function saveStoredUsers(users: StoredUser[]): boolean {
  inMemoryUsers = users;
  try {
    const dir = path.dirname(USERS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing admin-users.json:', err);
    return false;
  }
}

export function createOrUpdateStoredUser(input: {
  username: string;
  name: string;
  password?: string;
  role: 'admin' | 'agent';
}): { success: boolean; user?: Omit<StoredUser, 'passwordHash'>; error?: string } {
  const username = (input.username || '').trim().toLowerCase();
  const name = (input.name || '').trim();

  if (!username) {
    return { success: false, error: 'Username is required.' };
  }
  if (!name) {
    return { success: false, error: 'Name is required.' };
  }

  const existing = getStoredUsers();
  const index = existing.findIndex((u) => u.username === username);

  if (index >= 0) {
    // Update existing user
    const userToUpdate = existing[index];
    userToUpdate.name = name;
    userToUpdate.role = input.role || userToUpdate.role;
    if (input.password && input.password.trim()) {
      userToUpdate.passwordHash = hashPassword(input.password.trim());
    }
    saveStoredUsers(existing);
    return {
      success: true,
      user: {
        username: userToUpdate.username,
        name: userToUpdate.name,
        role: userToUpdate.role,
        createdAt: userToUpdate.createdAt,
      },
    };
  } else {
    // Create new user
    if (!input.password || !input.password.trim()) {
      return { success: false, error: 'Password is required for new accounts.' };
    }
    if (input.password.trim().length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    const newUser: StoredUser = {
      username,
      name,
      passwordHash: hashPassword(input.password.trim()),
      role: input.role || 'agent',
      createdAt: new Date().toISOString(),
    };

    saveStoredUsers([newUser, ...existing]);
    return {
      success: true,
      user: {
        username: newUser.username,
        name: newUser.name,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
    };
  }
}

export function deleteStoredUser(username: string): { success: boolean; error?: string } {
  const normalized = username.trim().toLowerCase();
  const existing = getStoredUsers();
  const filtered = existing.filter((u) => u.username !== normalized);

  if (filtered.length === existing.length) {
    return { success: false, error: 'User not found in custom credentials store.' };
  }

  saveStoredUsers(filtered);
  return { success: true };
}

export function validateCredentials(usernameInput: string, passwordInput: string): AdminUser | null {
  const normalizedUser = (usernameInput || '').trim().toLowerCase();
  const password = (passwordInput || '').trim();

  if (!normalizedUser || !password) return null;

  // 1. Check custom stored users first
  const storedUsers = getStoredUsers();
  const match = storedUsers.find((u) => u.username === normalizedUser);
  if (match) {
    const inputHash = hashPassword(password);
    if (match.passwordHash === inputHash) {
      return {
        username: match.username,
        name: match.name,
        role: match.role,
      };
    }
  }

  // 2. Check admin (via ADMIN_PASSWORD env or sha256 hash match)
  if (normalizedUser === 'admin' || normalizedUser === 'admin@countycargo.com') {
    const isValid = process.env.ADMIN_PASSWORD
      ? password === process.env.ADMIN_PASSWORD
      : sha256(password) === ROOT_ADMIN_HASH;
    if (isValid) {
      return {
        username: 'admin',
        name: ADMIN_CREDENTIALS.admin.name,
        role: 'admin',
      };
    }
  }

  // 3. Check agent (via AGENT_PASSWORD env or sha256 hash match)
  if (normalizedUser === 'agent' || normalizedUser === 'agent@countycargo.com') {
    const isValid = process.env.AGENT_PASSWORD
      ? password === process.env.AGENT_PASSWORD
      : sha256(password) === ROOT_AGENT_HASH;
    if (isValid) {
      return {
        username: 'agent',
        name: ADMIN_CREDENTIALS.agent.name,
        role: 'agent',
      };
    }
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

export function verifyApiKey(keyInput: string | null | undefined): AdminUser | null {
  if (!keyInput) return null;
  const cleanKey = keyInput.replace(/^Bearer\s+/i, '').trim();
  const isValid = process.env.ADMIN_API_KEY
    ? cleanKey === process.env.ADMIN_API_KEY
    : sha256(cleanKey) === ROOT_API_KEY_HASH;

  if (isValid) {
    return {
      username: 'automated-agent',
      name: 'County Cargo Publishing Agent',
      role: 'admin',
    };
  }
  return null;
}

export async function authenticateRequest(request: Request): Promise<AdminUser | SessionPayload | null> {
  const apiKeyHeader =
    request.headers.get('x-admin-api-key') || request.headers.get('authorization');
  if (apiKeyHeader) {
    const apiUser = verifyApiKey(apiKeyHeader);
    if (apiUser) return apiUser;
  }

  return await getCurrentAdminSession();
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
