import type { APIRoute } from "astro";
import { createCalendarEvent, getAllCalendarEvents } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export const prerender = false;

// GET - Obtener todos los eventos
export const GET: APIRoute = async ({ cookies }) => {
  try {
    const events = await getAllCalendarEvents();
    return new Response(JSON.stringify(events), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return new Response(JSON.stringify({ error: "Error fetching events" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

// POST - Crear nuevo evento
export const POST: APIRoute = async ({ request, cookies }) => {
  const authenticated = await isAuthenticated(cookies);
  if (!authenticated) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const body = await request.json();
    const { event_date, is_busy, titulo, descripcion } = body;

    if (!event_date || typeof is_busy !== "boolean" || !titulo) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const event = await createCalendarEvent(
      new Date(event_date),
      is_busy,
      titulo,
      descripcion
    );

    return new Response(JSON.stringify(event), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating calendar event:", error);
    return new Response(JSON.stringify({ error: "Error creating event" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
