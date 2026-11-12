export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export type ApiError = {
  detail?: string;
  request_id?: string;
};

export function getClientToken(): string | null {
  if (typeof window === "undefined") return null;
  const fromLocal = localStorage.getItem("cl_token");
  if (fromLocal) return fromLocal;
  const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]+)/);
  return match ? match[1] : null;
}

export function setClientToken(token: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("cl_token", token);
  } catch {}
  document.cookie = `access_token=${token}; path=/; max-age=86400; SameSite=Lax`;
}

export function clearClientToken() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("cl_token");
  } catch {}
  document.cookie = "access_token=; path=/; max-age=0; SameSite=Lax";
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getClientToken();
  const authHeaders: Record<string, string> = {};
  if (token && !token.startsWith("demo-")) {
    authHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
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
    throw error;
  }

  return response.json() as Promise<T>;
}

export async function logout() {
  clearClientToken();
  try {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
      cache: "no-store",
    });
  } catch {}
}
