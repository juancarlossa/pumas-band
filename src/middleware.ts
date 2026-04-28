import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const host = context.request.headers.get("host");

  if (host === "pumasband.vercel.app") {
    const url = new URL(context.request.url);
    return Response.redirect(
      "https://pumasband.com" + url.pathname + url.search,
      301
    );
  }

  return next();
});