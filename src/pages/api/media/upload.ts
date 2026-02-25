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
        console.log('=== INICIO UPLOAD ===');
        console.log('CLOUDINARY_URL exists:', !!CLOUDINARY_URL);
        console.log('Cloud name:', cloudName);
        console.log('API Key:', apiKey ? 'SET' : 'NOT SET');
        console.log('API Secret:', apiSecret ? 'SET' : 'NOT SET');

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const mediaKey = formData.get('key') as string;
        const mediaType = formData.get('type') as string;
        const altText = formData.get('alt_text') as string | null;

        console.log('File:', file?.name, file?.type, file?.size);
        console.log('Media key:', mediaKey);
        console.log('Media type:', mediaType);

        if (!file || !mediaKey || !mediaType) {
            console.error('Faltan datos requeridos');
            return new Response(JSON.stringify({ error: 'Faltan datos requeridos' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Convertir a buffer para upload directo (más eficiente que base64)
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        console.log('Buffer size:', buffer.length, 'bytes');

        const uploadOptions = {
            folder: 'pumas-band',
            resource_type: mediaType === 'video' ? 'video' as const : 'image' as const,
            public_id: mediaKey.replace(/\./g, '_'),
        };

        console.log('Upload options:', uploadOptions);
        console.log('Iniciando upload a Cloudinary...');

        // Upload usando stream en lugar de base64 para evitar límite de Vercel
        const result = await new Promise<any>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                uploadOptions,
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(buffer);
        });

        console.log('Upload exitoso:', result.secure_url);

        // Guardar en la base de datos con alt_text
        console.log('Guardando en base de datos...');
        await sql`
            INSERT INTO editable_media (key, url, type, section, alt_text, updated_at)
            VALUES (${mediaKey}, ${result.secure_url}, ${mediaType}, ${mediaKey.split('.')[0]}, ${altText}, NOW())
            ON CONFLICT (key) 
            DO UPDATE SET url = ${result.secure_url}, alt_text = ${altText}, updated_at = NOW()
        `;

        console.log('Guardado en DB exitoso');

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
        console.error('=== ERROR COMPLETO ===');
        console.error('Error type:', error?.constructor?.name);
        console.error('Error message:', error instanceof Error ? error.message : String(error));
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
        console.error('Error object:', JSON.stringify(error, null, 2));

        return new Response(
            JSON.stringify({
                error: 'Error al subir el archivo',
                details: error instanceof Error ? error.message : String(error)
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
};
