import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://flask-backend:5000';

export async function POST(req) {
    try {
        const body = await req.json();
        const backendRes = await fetch(`${BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await backendRes.json().catch(() => ({}));

        if (!backendRes.ok) {
            return NextResponse.json(data, { status: backendRes.status });
        }

        const response = NextResponse.json({ user: data.user });
        response.cookies.set('session', data.session, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
            // secure: false — app runs over plain HTTP; set to true only when HTTPS is configured
        });
        return response;
    } catch (err) {
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}
