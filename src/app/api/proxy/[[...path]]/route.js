const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://flask-backend:5000';

function buildForwardHeaders(req) {
    const headers = { 'Content-Type': 'application/json' };
    const cookie = req.headers.get('cookie');
    if (cookie) headers['Cookie'] = cookie;
    return headers;
}

export async function POST(req, context) {
    const { path = [] } = await context.params || {};
    const targetUrl = `${BACKEND_URL}/${path.join('/')}`;

    try {
        const body = await req.json().catch(() => ({}));
        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: buildForwardHeaders(req),
            body: JSON.stringify(body),
        });
        const data = await response.json().catch(() => ({}));
        return new Response(JSON.stringify(data), { status: response.status });
    } catch (error) {
        console.error('Error proxying POST:', error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function GET(req, context) {
    const { path = [] } = await context.params || {};
    const targetUrl = `${BACKEND_URL}/${path.join('/')}`;

    try {
        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: buildForwardHeaders(req),
        });
        const data = await response.json().catch(() => ({}));
        return new Response(JSON.stringify(data), { status: response.status });
    } catch (error) {
        console.error('Error proxying GET:', error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
