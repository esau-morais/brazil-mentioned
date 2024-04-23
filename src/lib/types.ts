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
};
