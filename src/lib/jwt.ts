import { SignJWT, jwtVerify } from 'jose';

const SECRET_TOKEN = import.meta.env.SECRET_TOKEN;

if (!SECRET_TOKEN) {
    throw new Error('SECRET_TOKEN is not defined in environment variables');
}

const secret = new TextEncoder().encode(SECRET_TOKEN);

export async function createToken(payload: { username: string }): Promise<string> {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(secret);
}

export async function verifyToken(token: string): Promise<{ username: string } | null> {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload as { username: string };
    } catch (error) {
        return null;
    }
}
