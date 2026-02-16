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

export interface CalendarEvent {
    id: number;
    event_date: Date;
    is_busy: boolean;
    titulo: string;
    descripcion: string | null;
    created_at: Date;
    updated_at: Date;
}

export async function getAllCalendarEvents(): Promise<CalendarEvent[]> {
    return await sql<CalendarEvent[]>`
        SELECT * FROM calendar_events ORDER BY event_date
    `;
}

export async function getCalendarEventsByDateRange(startDate: Date, endDate: Date): Promise<CalendarEvent[]> {
    return await sql<CalendarEvent[]>`
        SELECT * FROM calendar_events 
        WHERE event_date >= ${startDate.toISOString().split('T')[0]} 
        AND event_date <= ${endDate.toISOString().split('T')[0]}
        ORDER BY event_date
    `;
}

export async function createCalendarEvent(
    eventDate: Date,
    isBusy: boolean,
    titulo: string,
    descripcion?: string
): Promise<CalendarEvent> {
    const result = await sql<CalendarEvent[]>`
        INSERT INTO calendar_events (event_date, is_busy, titulo, descripcion)
        VALUES (${eventDate.toISOString().split('T')[0]}, ${isBusy}, ${titulo}, ${descripcion || null})
        RETURNING *
    `;
    return result[0];
}

export async function updateCalendarEvent(
    id: number,
    eventDate: Date,
    isBusy: boolean,
    titulo: string,
    descripcion?: string
): Promise<CalendarEvent> {
    const result = await sql<CalendarEvent[]>`
        UPDATE calendar_events 
        SET event_date = ${eventDate.toISOString().split('T')[0]},
            is_busy = ${isBusy},
            titulo = ${titulo},
            descripcion = ${descripcion || null}
        WHERE id = ${id}
        RETURNING *
    `;
    return result[0];
}

export async function deleteCalendarEvent(id: number): Promise<void> {
    await sql`
        DELETE FROM calendar_events WHERE id = ${id}
    `;
}
