import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = ({ clientAddress, request }) => {
    const ip =
        clientAddress ??
        request.headers.get("x-forwarded-for")?.split(",")[0] ??
        request.headers.get("x-real-ip") ??
        request.headers.get("cf-connecting-ip") ??
        "unknown";

    console.log(`[VISITOR IP] ${ip}`);

    return new Response(JSON.stringify({ ip }), {
        headers: { "Content-Type": "application/json" },
    });
};