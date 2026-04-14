import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ message: 'Logged out' })
    // Clear auth cookie
    response.cookies.delete('auth_token')
    return response
  } catch (error) {
    console.error('[v0] Logout error:', error)
    return NextResponse.json(
      { message: 'Logout failed' },
      { status: 500 }
    )
  }
}
