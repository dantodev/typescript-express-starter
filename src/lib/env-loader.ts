import dotenv from "dotenv";
import fs from "fs";
import path from "path";

export function initEnvLoader(): void {
  loadEnv("../../.env.local");
  loadEnv(`../../.env.${process.env.NODE_ENV}`);
  loadEnv("../../.env");
}

function loadEnv(envPath: string) {
  envPath = path.resolve(__dirname, envPath);
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}
