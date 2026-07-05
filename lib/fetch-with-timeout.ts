export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit,
  timeout = 15000
) {
  const controller = new AbortController();

  const id = setTimeout(() => {
    controller.abort("Request timed out");
  }, timeout);

  try {
    const response = await fetch(input, {
      ...init,
      signal: controller.signal,
    });

    return response;
  } finally {
    clearTimeout(id);
  }
}