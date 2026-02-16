import bcrypt from 'bcryptjs';
import type { AstroCookies } from 'astro';
import { verifyToken } from './jwt';

const ADMIN_USERNAME = import.meta.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD;

console.log('[AUTH INIT] ADMIN_USERNAME:', ADMIN_USERNAME);
console.log('[AUTH INIT] ADMIN_PASSWORD length:', ADMIN_PASSWORD?.length);
console.log('[AUTH INIT] ADMIN_PASSWORD starts with:', ADMIN_PASSWORD);

if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be defined in environment variables');
}

export async function validateCredentials(username: string, password: string): Promise<boolean> {
    if (username !== ADMIN_USERNAME) {
        return false;
    }

    // Si la contraseña en .env está hasheada, usar bcrypt.compare
    // Si es texto plano (para desarrollo), comparar directamente
    if (ADMIN_PASSWORD.startsWith('$2a$') || ADMIN_PASSWORD.startsWith('$2b$')) {
        return await bcrypt.compare(password, ADMIN_PASSWORD);
    }

    // Comparación directa para desarrollo (NO RECOMENDADO EN PRODUCCIÓN)
    return password === ADMIN_PASSWORD;
}

export async function isAuthenticated(cookies: AstroCookies): Promise<boolean> {
    const token = cookies.get('auth_token')?.value;

    if (!token) {
        return false;
    }

    const payload = await verifyToken(token);
    return payload !== null;
}

export async function getAuthUser(cookies: AstroCookies): Promise<string | null> {
    const token = cookies.get('auth_token')?.value;

    if (!token) {
        return null;
    }

    const payload = await verifyToken(token);
    return payload?.username || null;
}
