import postgres from 'postgres';

const DATABASE_URL = import.meta.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in environment variables');
}

export const sql = postgres(DATABASE_URL);

export interface EditableText {
    id: number;
    key: string;
    content: string;
    section: string | null;
    created_at: Date;
    updated_at: Date;
}

export async function getAllTexts(): Promise<EditableText[]> {
    return await sql<EditableText[]>`
        SELECT * FROM editable_texts ORDER BY section, key
    `;
}

export async function getTextByKey(key: string): Promise<EditableText | null> {
    const result = await sql<EditableText[]>`
        SELECT * FROM editable_texts WHERE key = ${key} LIMIT 1
    `;
    return result[0] || null;
}

export async function updateText(key: string, content: string): Promise<EditableText> {
    const result = await sql<EditableText[]>`
        UPDATE editable_texts 
        SET content = ${content}
        WHERE key = ${key}
        RETURNING *
    `;
    return result[0];
}

export async function createText(key: string, content: string, section?: string): Promise<EditableText> {
    const result = await sql<EditableText[]>`
        INSERT INTO editable_texts (key, content, section)
        VALUES (${key}, ${content}, ${section || null})
        RETURNING *
    `;
    return result[0];
}

export interface EditableMedia {
    id: number;
    key: string;
    url: string;
    type: string;
    section: string | null;
    alt_text: string | null;
    created_at: Date;
    updated_at: Date;
}

export async function getAllMedia(): Promise<EditableMedia[]> {
    return await sql<EditableMedia[]>`
        SELECT * FROM editable_media ORDER BY section, key
    `;
}

export async function getMediaByKey(key: string): Promise<EditableMedia | null> {
    const result = await sql<EditableMedia[]>`
        SELECT * FROM editable_media WHERE key = ${key} LIMIT 1
    `;
    return result[0] || null;
}

export async function getMediaBySection(section: string): Promise<EditableMedia[]> {
    return await sql<EditableMedia[]>`
        SELECT * FROM editable_media WHERE section = ${section} ORDER BY key
    `;
}
