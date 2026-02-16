import type { APIRoute } from 'astro';
import { isAuthenticated } from '@/lib/auth';
import { getAllTexts } from '@/lib/db';

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
    try {
        const authenticated = await isAuthenticated(cookies);
        
        if (!authenticated) {
            return new Response(
                JSON.stringify({ error: 'Unauthorized' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const texts = await getAllTexts();

        return new Response(
            JSON.stringify({ texts }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error fetching texts:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
