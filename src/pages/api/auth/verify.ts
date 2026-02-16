import type { APIRoute } from 'astro';
import { isAuthenticated, getAuthUser } from '@/lib/auth';

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
    const authenticated = await isAuthenticated(cookies);
    
    if (!authenticated) {
        return new Response(
            JSON.stringify({ authenticated: false }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const username = await getAuthUser(cookies);

    return new Response(
        JSON.stringify({ authenticated: true, username }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
};
