import { nullish } from "./util";
import { browser } from "$app/env";
import { derived, readable, writable } from "svelte/store";

function createStorage(storage, key) {
  const { subscribe, set } = writable(storage.getItem(key));

  return { subscribe,
    set: (value) => {
      storage.setItem(key, value);

      set(value);
    },
    remove: () => {
      storage.removeItem(key);

      set(null);
    }
  };
}

function createMediaQueryMatcher(mq) {
  return readable(mq.matches, (set) => {
    const handler = (query) => set(query.matches);

    mq.addEventListener("change", handler);

    return () => mq.removeEventListener("change", handler);
  });
}

/**
 * Represents the user's selected theme. Can be `light`, `dark`, or `null`, with `null` representing the user's absence
 * of a selection.
 *
 */
export const themeStorage = browser ? createStorage(localStorage, "theme") : null;

/**
 * Represents the user's preferred theme on their system.
 */
export const prefersDarkTheme = browser ? createMediaQueryMatcher(matchMedia("(prefers-color-scheme: dark)")) : null;

export const theme = browser
  ? derived([themeStorage, prefersDarkTheme], ([$theme, $matches]) => $theme ?? ($matches ? "dark" : "light"))
  : null;
