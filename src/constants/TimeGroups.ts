export type TimeGroupKey =
  | "today"
  | "yesterday"
  | "last7days"
  | "last30days"
  | "older";

export const timeGroups: Array<{ key: TimeGroupKey; label: string }> = [
  { key: "today", label: "今天" },
  { key: "yesterday", label: "昨天" },
  { key: "last7days", label: "最近 7 天" },
  { key: "last30days", label: "最近 30 天" },
  { key: "older", label: "更早" },
];
