export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export type ApiError = {
  detail?: string;
  request_id?: string;
};

let handlingAuthFailure = false;

async function handleAuthenticationFailure() {
  if (handlingAuthFailure || typeof window === "undefined") {
    return;
  }

  handlingAuthFailure = true;

  try {
    // Logout endpoint is public and clears the HttpOnly cookie.
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
      cache: "no-store",
    });
  } catch {
    // Even if the API is unavailable, continue to the login page.
  }

  const currentPath =
    window.location.pathname + window.location.search;

  const loginUrl =
    `/login?next=${encodeURIComponent(currentPath)}`;

  window.location.replace(loginUrl);
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let body: ApiError = {};

    try {
      body = await response.json();
    } catch {
      // Keep the generic message below.
    }

    const error = new Error(
      body.detail ?? `Request failed (${response.status})`,
    ) as Error & {
      status?: number;
      requestId?: string;
    };

    error.status = response.status;
    error.requestId = body.request_id;

    if (response.status === 401) {
      void handleAuthenticationFailure();
    }

    throw error;
  }

  return response.json() as Promise<T>;
}

export async function logout() {
  await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
    cache: "no-store",
  });
}