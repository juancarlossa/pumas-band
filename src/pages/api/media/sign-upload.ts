import type { APIRoute } from 'astro';
import { v2 as cloudinary } from 'cloudinary';

// Reutiliza tu config de cloudinary existente...
const CLOUDINARY_URL = process.env.CLOUDINARY_URL || import.meta.env.CLOUDINARY_URL;
const urlParts = CLOUDINARY_URL.replace('cloudinary://', '').split('@');
const [apiKeySecret] = urlParts;
const cloudName = urlParts[1];
const [apiKey, apiSecret] = apiKeySecret.split(':');

cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

export const POST: APIRoute = async ({ request }) => {
    const { mediaKey } = await request.json();

    const timestamp = Math.round(Date.now() / 1000);
    const folder = 'pumas-band';
    const public_id = mediaKey.replace(/\./g, '_');

    const signature = cloudinary.utils.api_sign_request(
        { timestamp, folder, public_id },
        apiSecret
    );

    return new Response(JSON.stringify({
        timestamp,
        signature,
        folder,
        public_id,
        api_key: apiKey,
        cloud_name: cloudName,
    }), { headers: { 'Content-Type': 'application/json' } });
};