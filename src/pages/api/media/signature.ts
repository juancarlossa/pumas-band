import type { APIRoute } from 'astro';
import { v2 as cloudinary } from 'cloudinary';

const CLOUDINARY_URL = process.env.CLOUDINARY_URL || import.meta.env.CLOUDINARY_URL;

if (!CLOUDINARY_URL) {
    throw new Error('CLOUDINARY_URL no está configurado');
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
        const { folder, public_id } = await request.json();

        const timestamp = Math.round(new Date().getTime() / 1000);
        
        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp,
                folder: folder || 'pumas-band',
                public_id: public_id || undefined,
            },
            apiSecret
        );

        return new Response(
            JSON.stringify({
                signature,
                timestamp,
                cloudName,
                apiKey,
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Error generando signature:', error);
        return new Response(
            JSON.stringify({ error: 'Error generando signature' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
};
