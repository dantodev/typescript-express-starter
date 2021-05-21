const LogLevels: { [key: string]: number } = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logDebug(...args: any[]): void {
  if (allowLogLevel("debug")) {
    console.debug(...args);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logInfo(...args: any[]): void {
  if (allowLogLevel("info")) {
    console.info(...args);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logWarn(...args: any[]): void {
  if (allowLogLevel("warn")) {
    console.warn(...args);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logError(...args: string[]): void {
  if (allowLogLevel("error")) {
    console.error(...args);
  }
}

function allowLogLevel(name: string) {
  let level = getLevelIndex(name);
  let currentLevel = getLevelIndex(process.env.LOG_LEVEL);
  return level >= currentLevel;
}

function getLevelIndex(name: string): number {
  return LogLevels[name] || 0;
}
