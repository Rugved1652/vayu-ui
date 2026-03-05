import type { Registry } from "./index";
import { hooks } from "./hooks";
import { components } from "./components";
import { templates } from "./templates";

const all = [...hooks, ...components, ...templates];

export const registry: Registry = Object.fromEntries(
    all.map((item) => [item.name, item])
);