export function readLocalState<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeLocalState<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage failures; UI state should still work in-memory.
  }
}

type VersionedLocalState<T> = {
  version: number;
  data: T;
};

export function readVersionedLocalState<T>(
  key: string,
  version: number,
  fallback: T,
): T {
  const stored = readLocalState<VersionedLocalState<T> | null>(key, null);
  if (
    !stored ||
    typeof stored !== "object" ||
    typeof stored.version !== "number" ||
    !("data" in stored)
  ) {
    return fallback;
  }

  if (stored.version !== version) {
    return fallback;
  }

  return stored.data;
}

export function writeVersionedLocalState<T>(
  key: string,
  version: number,
  value: T,
) {
  writeLocalState<VersionedLocalState<T>>(key, {
    version,
    data: value,
  });
}
