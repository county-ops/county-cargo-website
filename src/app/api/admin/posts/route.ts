import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/admin-auth';
import {
  getCustomBlogPosts,
  getAllBlogPosts,
  createNewBlogPost,
  deleteCustomBlogPost,
} from '@/lib/blog-storage';

export async function GET(request: NextRequest) {
  const user = await authenticateRequest(request);
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Provide a valid session or x-admin-api-key header.' },
      { status: 401 }
    );
  }

  const customPosts = getCustomBlogPosts();
  const allPosts = getAllBlogPosts();

  return NextResponse.json({
    success: true,
    user: {
      username: user.username,
      name: user.name,
      role: user.role,
    },
    customPosts,
    totalPostsCount: allPosts.length,
    customPostsCount: customPosts.length,
  });
}

export async function POST(request: NextRequest) {
  const user = await authenticateRequest(request);
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Provide a valid session or x-admin-api-key header.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const result = createNewBlogPost(body, {
      name: user.name,
      username: user.username,
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post published successfully!',
      post: result.post,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to save blog post.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const user = await authenticateRequest(request);
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Provide a valid session or x-admin-api-key header.' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ success: false, error: 'Slug parameter is required.' }, { status: 400 });
    }

    const result = deleteCustomBlogPost(slug);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to delete blog post.' },
      { status: 500 }
    );
  }
}
