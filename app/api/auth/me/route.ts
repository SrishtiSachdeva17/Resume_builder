import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // TODO: Verify auth token from cookie and fetch user from database
    const authToken = request.cookies.get('auth_token')

    if (!authToken) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Mock user data
    const mockUser = {
      id: '1',
      email: 'user@example.com',
      name: 'User',
    }

    return NextResponse.json({ user: mockUser })
  } catch (error) {
    console.error('[v0] Auth check error:', error)
    return NextResponse.json(
      { message: 'Auth check failed' },
      { status: 500 }
    )
  }
}
