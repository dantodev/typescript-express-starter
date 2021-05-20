import { routeObject } from "../lib/router";

export function home({ response }: routeObject): void {
  response.send("Hello World");
}
