import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const response = NextResponse.json({ message: 'Logout successful' });

    response.cookies.set({
      name: 'vaultSneak_token',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Logout failed' }, { status: 500 });
  }
}