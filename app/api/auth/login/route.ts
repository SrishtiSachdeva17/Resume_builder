import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // TODO: Implement actual authentication with database
    // For now, return a mock user
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0],
    }

    const response = NextResponse.json({ user: mockUser })
    // In a real app, set secure HTTP-only cookie here
    response.cookies.set('auth_token', 'mock_token_12345', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })

    return response
  } catch (error) {
    console.error('[v0] Login error:', error)
    return NextResponse.json(
      { message: 'Login failed' },
      { status: 500 }
    )
  }
}
