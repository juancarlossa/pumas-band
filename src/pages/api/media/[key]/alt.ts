import type { APIRoute } from 'astro';
import { sql } from '@/lib/db';

export const PUT: APIRoute = async ({ params, request }) => {
    try {
        const { key } = params;
        
        if (!key) {
            return new Response(
                JSON.stringify({ error: 'Media key is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const body = await request.json();
        const { alt_text } = body;

        // Actualizar solo el alt_text en la base de datos
        await sql`
            UPDATE editable_media 
            SET alt_text = ${alt_text}, updated_at = NOW()
            WHERE key = ${key}
        `;

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error updating alt text:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to update alt text' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
