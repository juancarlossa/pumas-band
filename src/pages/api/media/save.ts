import type { APIRoute } from 'astro';
import { sql } from '@/lib/db';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { key, url, type, alt_text } = await request.json();

        if (!key || !url || !type) {
            return new Response(
                JSON.stringify({ error: 'Faltan datos requeridos' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        await sql`
            INSERT INTO editable_media (key, url, type, section, alt_text, updated_at)
            VALUES (${key}, ${url}, ${type}, ${key.split('.')[0]}, ${alt_text || null}, NOW())
            ON CONFLICT (key) 
            DO UPDATE SET url = ${url}, alt_text = ${alt_text || null}, updated_at = NOW()
        `;

        return new Response(
            JSON.stringify({ success: true }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Error al guardar en DB:', error);
        return new Response(
            JSON.stringify({ 
                error: 'Error al guardar en la base de datos',
                details: error instanceof Error ? error.message : String(error)
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
};
