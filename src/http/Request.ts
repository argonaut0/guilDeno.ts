/*
 * This module provides a fetch() wrapper for authentication
 * and headers. It has no knowledge of any API endpoints.
 *
 * https://www.guilded.gg/docs/api/auth
 */

/** Sends a request with auth token and proper headers. */
export type Sender = (
  url: string,
  method: string,
  data?: unknown,
) => Promise<RequestError | any>;

/** Error thrown on unsuccessful api request. */
export class RequestError extends Error {
  public readonly code;

  /** @param code HTTP status code */
  constructor(code: number) {
    super(STATUS_CODES[String(code) as keyof typeof STATUS_CODES]);
    this.name = "RequestError";
    this.code = code;
  }
}

/**
 * Request status codes from API.
 * https://www.guilded.gg/docs/api/status_codes
 */
export const STATUS_CODES = {
  "200": "The request was successful",
  "201": "The content was created",
  "204": "No content returned",
  "400": "The request was unacceptable, often due to missing parameters",
  "401": "The access token is missing or invalid",
  "403": "The bot does not have the necessary permissions",
  "404": "The requested resource does not exist",
  "409": "The request conflicted with another request",
  "500": "Guilded server error",
  "501": "Guilded server error",
  "502": "Guilded server error",
  "503": "Guilded server error",
  "504": "Guilded server error",
};

/**
 * Creates a wrapper for fetch() with proper headers.
 * @param token Authentication Token.
 * @returns Request-sending function or RequestError.
 */
export default function getSender(token: string): Sender {
  return async function (url: string, method: string, data?: unknown) {
    const res = await fetch(url, {
      method: method,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      // Consume response body so no resources are leaked.
      await res.text();
      return new RequestError(res.status);
    } else if (res.status !== 204) {
      return res.json();
    }
  };
}
