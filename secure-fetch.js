"use server";

import { cookies } from "next/headers";

export async function secureFetch(url, options = {}) {
  
  const { disableContentType, disableJsonResponse, headers = {}, ...rest } = options;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.API_URL}${url}`, {
    ...rest,
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
      ...(disableContentType ? {} : { "Content-Type": "application/json" }),
    },
    credentials: "include",
  });

  if (disableJsonResponse) {
    return res.blob();
  }

  return res.json();
}
