import { useCallback, useState } from "react";
import { CookieOptions } from "../types";

const isBrowser = typeof window !== "undefined";

type Key = keyof CookieOptions;

const stringifyOptions = (options: CookieOptions) => {
  return Object.keys(options).reduce((acc, key) => {
    if (key === "days") {
      return acc;
    } else {
      if (options[key as Key] === false) {
        return acc;
      } else if (options[key as Key] === true) {
        return `${acc}; ${key}`;
      } else {
        return `${acc}; ${key}=${options[key as Key]}`;
      }
    }
  }, "");
};

const setCookie = (name: string, value: string, options?: CookieOptions) => {
  if (!isBrowser) return;

  const optionsWithDefaults = {
    days: 7,
    path: "/",
    ...options,
  };

  const expires = new Date(
    Date.now() + optionsWithDefaults.days * 864e5,
  ).toUTCString();

  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expires +
    stringifyOptions(optionsWithDefaults);
};

const getCookie = (name: string, initialValue = "") => {
  return (
    (isBrowser &&
      document.cookie.split("; ").reduce((r, v) => {
        const parts = v.split("=");
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
      }, "")) ||
    initialValue
  );
};

export const useCookie = (key: string, initialValue?: string) => {
  const [item, setItem] = useState(() => {
    return getCookie(key, initialValue);
  });

  const updateItem = useCallback(
    (value: string, options?: CookieOptions) => {
      setItem(value);
      setCookie(key, value, options);
    },
    [key],
  );

  return [item, updateItem] as [string, typeof updateItem];
};
