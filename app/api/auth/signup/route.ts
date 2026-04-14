import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    // TODO: Implement actual user registration with database
    // For now, return a mock user
    const mockUser = {
      id: Date.now().toString(),
      email,
      name,
    }

    const response = NextResponse.json({ user: mockUser })
    // In a real app, set secure HTTP-only cookie here
    response.cookies.set('auth_token', 'mock_token_' + Date.now(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })

    return response
  } catch (error) {
    console.error('[v0] Signup error:', error)
    return NextResponse.json(
      { message: 'Signup failed' },
      { status: 500 }
    )
  }
}
