import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://flask-backend:5000';

export async function POST(req) {
    const token = req.cookies.get('session')?.value;
    if (token) {
        await fetch(`${BACKEND_URL}/auth/logout`, {
            method: 'POST',
            headers: { Cookie: `session=${token}` },
        }).catch(() => {});
    }
    const response = NextResponse.json({ ok: true });
    response.cookies.set('session', '', { httpOnly: true, path: '/', maxAge: 0 });
    return response;
}
