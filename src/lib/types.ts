export type CookieOptions = {
  days?: number;
  path?: string;
  domain?: string;
  SameSite?: "None" | "Lax" | "Strict";
  Secure?: boolean;
  HttpOnly?: boolean;
};

export type Poll = {
  title: string;
  options: string[];
  votes?: number[];
  duration: number;
};

export type SessionPayload = { userId: string; expiresAt: Date };
