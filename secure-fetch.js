'use server'

import { cookies } from "next/headers";

export async function secureFetch(url, options = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const disableContentType = options?.disableContentType === true;

  const response = await fetch(`${process.env.API_URL}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Authorization": `Bearer ${accessToken}`,
      ...(disableContentType ? {} : { "Content-Type": "application/json" }),
    },
    credentials: "include",
  });

  // if (!response.ok) {
  //   throw new Error(`Error ${response.status}`);
  // }

    return await response.json();
}
