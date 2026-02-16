import type { APIRoute } from 'astro';
import { isAuthenticated } from '@/lib/auth';
import { getTextByKey, updateText, createText } from '@/lib/db';

export const prerender = false;

export const GET: APIRoute = async ({ params, cookies }) => {
    try {
        const { key } = params;
        
        if (!key) {
            return new Response(
                JSON.stringify({ error: 'Key is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const text = await getTextByKey(key);

        if (!text) {
            return new Response(
                JSON.stringify({ error: 'Text not found' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ text }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error fetching text:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

export const PUT: APIRoute = async ({ params, request, cookies }) => {
    try {
        const authenticated = await isAuthenticated(cookies);
        
        if (!authenticated) {
            return new Response(
                JSON.stringify({ error: 'Unauthorized' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const { key } = params;
        
        if (!key) {
            return new Response(
                JSON.stringify({ error: 'Key is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const body = await request.json();
        const { content } = body;

        if (!content) {
            return new Response(
                JSON.stringify({ error: 'Content is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const existingText = await getTextByKey(key);
        
        let updatedText;
        if (existingText) {
            updatedText = await updateText(key, content);
        } else {
            updatedText = await createText(key, content);
        }

        return new Response(
            JSON.stringify({ text: updatedText }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error updating text:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
