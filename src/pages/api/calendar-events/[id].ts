import type { APIRoute } from "astro";
import { updateCalendarEvent, deleteCalendarEvent } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export const prerender = false;

// PUT - Actualizar evento existente
export const PUT: APIRoute = async ({ params, request, cookies }) => {
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
    const id = parseInt(params.id || "");
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid ID" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

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

    const event = await updateCalendarEvent(
      id,
      new Date(event_date),
      is_busy,
      titulo,
      descripcion
    );

    return new Response(JSON.stringify(event), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating calendar event:", error);
    return new Response(JSON.stringify({ error: "Error updating event" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

// DELETE - Eliminar evento
export const DELETE: APIRoute = async ({ params, cookies }) => {
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
    const id = parseInt(params.id || "");
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid ID" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    await deleteCalendarEvent(id);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error deleting calendar event:", error);
    return new Response(JSON.stringify({ error: "Error deleting event" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
