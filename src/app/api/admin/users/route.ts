import { NextRequest, NextResponse } from 'next/server';
import {
  authenticateRequest,
  getStoredUsers,
  createOrUpdateStoredUser,
  deleteStoredUser,
  ADMIN_CREDENTIALS,
} from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  const user = await authenticateRequest(request);
  if (!user || user.role !== 'admin') {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Admin access required.' },
      { status: 403 }
    );
  }

  const customUsers = getStoredUsers().map((u) => ({
    username: u.username,
    name: u.name,
    role: u.role,
    createdAt: u.createdAt,
    isBuiltIn: false,
  }));

  const builtInUsers = [
    {
      username: ADMIN_CREDENTIALS.admin.username,
      name: ADMIN_CREDENTIALS.admin.name,
      role: ADMIN_CREDENTIALS.admin.role,
      createdAt: 'System Root',
      isBuiltIn: true,
    },
    {
      username: ADMIN_CREDENTIALS.agent.username,
      name: ADMIN_CREDENTIALS.agent.name,
      role: ADMIN_CREDENTIALS.agent.role,
      createdAt: 'System Default',
      isBuiltIn: true,
    },
  ];

  return NextResponse.json({
    success: true,
    users: [...builtInUsers, ...customUsers],
  });
}

export async function POST(request: NextRequest) {
  const user = await authenticateRequest(request);
  if (!user || user.role !== 'admin') {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Only admins can create or update credentials.' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { username, name, password, role } = body || {};

    if (
      username === ADMIN_CREDENTIALS.admin.username ||
      username === ADMIN_CREDENTIALS.agent.username
    ) {
      return NextResponse.json(
        {
          success: false,
          error: `The username "${username}" is a reserved system account. To change its password, use environment variables.`,
        },
        { status: 400 }
      );
    }

    const result = createOrUpdateStoredUser({
      username,
      name,
      password,
      role: role === 'admin' ? 'admin' : 'agent',
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Credential saved successfully.',
      user: result.user,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to save credential.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const user = await authenticateRequest(request);
  if (!user || user.role !== 'admin') {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Only admins can delete credentials.' },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { success: false, error: 'Username parameter is required.' },
        { status: 400 }
      );
    }

    const result = deleteStoredUser(username);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `User ${username} deleted successfully.`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to delete user.' },
      { status: 500 }
    );
  }
}
