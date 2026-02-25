import type { APIRoute } from 'astro';
import { v2 as cloudinary } from 'cloudinary';
import { sql } from '@/lib/db';

const CLOUDINARY_URL = process.env.CLOUDINARY_URL || import.meta.env.CLOUDINARY_URL;

if (!CLOUDINARY_URL) {
    throw new Error('CLOUDINARY_URL no está configurado en .env');
}

const urlParts = CLOUDINARY_URL.replace('cloudinary://', '').split('@');
const [apiKeySecret] = urlParts;
const cloudName = urlParts[1];
const [apiKey, apiSecret] = apiKeySecret.split(':');

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
});

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const mediaKey = formData.get('key') as string;
        const mediaType = formData.get('type') as string;
        const altText = formData.get('alt_text') as string | null;

        if (!file || !mediaKey || !mediaType) {
            return new Response(JSON.stringify({ error: 'Faltan datos requeridos' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64File = `data:${file.type};base64,${buffer.toString('base64')}`;

        const uploadOptions = {
            folder: 'pumas-band',
            resource_type: mediaType === 'video' ? 'video' as const : 'image' as const,
            public_id: mediaKey.replace(/\./g, '_'),
        };

        const result = await cloudinary.uploader.upload(base64File, uploadOptions);

        // Guardar en la base de datos con alt_text
        await sql`
            INSERT INTO editable_media (key, url, type, section, alt_text, updated_at)
            VALUES (${mediaKey}, ${result.secure_url}, ${mediaType}, ${mediaKey.split('.')[0]}, ${altText}, NOW())
            ON CONFLICT (key) 
            DO UPDATE SET url = ${result.secure_url}, alt_text = ${altText}, updated_at = NOW()
        `;

        return new Response(
            JSON.stringify({
                success: true,
                url: result.secure_url,
                publicId: result.public_id,
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Error al subir a Cloudinary:', error);
        return new Response(
            JSON.stringify({ error: 'Error al subir el archivo' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
};
