import axios from 'axios';

export async function POST(req, context) {
    console.log('Received POST request:', req.method, req.url);
    
    // Correctly access params inside the handler
    const { path = [] } = await context.params || {};  // Make sure params exist
    const method = req.method;

    // Construct the target URL to forward the request to
    const targetUrl = `${process.env.NEXT_PUBLIC_API_URL}/${path.join('/')}`;
    console.log(`Proxying ${method} to: ${targetUrl}`);

    try {
        // Log incoming body for debugging
        const requestBody = await req.json(); // Extract JSON body from the request
        console.log('Request Body:', requestBody);

        // Forward the request to the target URL
        const response = await axios({
            method,  // HTTP method (GET, POST, etc.)
            url: targetUrl,  // URL to proxy the request to
            data: requestBody,  // Correctly forward the request body
            headers: {
                'Content-Type': 'application/json',
                ...req.headers,  // Copy headers from the original request
            },
        });
        
        console.log('Response from target server:', response.status, response.data);

        // Send the response from the target server back to the client
        return new Response(JSON.stringify(response.data), { status: response.status });
    } catch (error) {
        // Handle errors from the proxied API
        console.error('Error proxying request:', error.message);
        return new Response(
            JSON.stringify({ error: error.message, details: error.response?.data || null }),
            { status: error.response?.status || 500 }
        );
    }
}

export async function GET(req, context) {
    console.log('Received GET request:', req.method, req.url);

    // Correctly access params inside the handler
    const { path = [] } = await context.params || {}; // Make sure params exist

    // Construct the target URL to forward the request to
    const targetUrl = `${process.env.NEXT_PUBLIC_API_URL}/${path.join('/')}`;
    console.log(`Proxying GET to: ${targetUrl}`);

    try {
        // Forward the request to the target URL
        const response = await axios({
            method: 'GET', // HTTP method
            url: targetUrl, // URL to proxy the request to
            headers: {
                ...req.headers, // Copy headers from the original request
            },
        });

        console.log('Response from target server:', response.status, response.data);

        // Send the response from the target server back to the client
        return new Response(JSON.stringify(response.data), { status: response.status });
    } catch (error) {
        // Handle errors from the proxied API
        console.error('Error proxying GET request:', error.message);
        return new Response(
            JSON.stringify({ error: error.message, details: error.response?.data || null }),
            { status: error.response?.status || 500 }
        );
    }
}
