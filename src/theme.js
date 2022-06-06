import { browser } from "$app/env";
import { writable } from "svelte/store";

export const theme = writable(browser ? localStorage.getItem("theme") : null);


