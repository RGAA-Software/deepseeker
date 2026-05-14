import type { TimeGroupKey } from "../constants/TimeGroups";

export type SessionItem = {
  id: string;
  title: string;
  group: TimeGroupKey;
  relative: string;
  active?: boolean;
};

export const mockSessions: SessionItem[] = [
  { id: "s1", title: "Refactor login flow", group: "today", relative: "now", active: true },
  { id: "s2", title: "Fix CSS responsive layout", group: "today", relative: "18m" },
  { id: "s3", title: "Add user authentication", group: "yesterday", relative: "1d" },
  { id: "s4", title: "Database migration script", group: "last7days", relative: "3d" },
  { id: "s5", title: "Workspace panel polish", group: "last30days", relative: "9d" },
  { id: "s6", title: "Initial project setup", group: "older", relative: "1mo" },
];
