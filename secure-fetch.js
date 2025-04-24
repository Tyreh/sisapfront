"use server";

import { cookies } from "next/headers";

export async function secureFetch(url, options = {}) {
  // Extraemos las opciones específicas y el resto
  const { disableContentType, disableJsonResponse, headers = {}, ...rest } = options;

  // Recuperamos el token de las cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // Ejecutamos fetch contra tu API
  const res = await fetch(`${process.env.API_URL}${url}`, {
    ...rest,
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
      // Solo añadimos Content-Type si no lo deshabilitas
      ...(disableContentType ? {} : { "Content-Type": "application/json" }),
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  // Si pediste blob, lo devolvemos
  if (disableJsonResponse) {
    return res.blob();
  }

  // Por defecto, devolvemos JSON
  return res.json();
}
