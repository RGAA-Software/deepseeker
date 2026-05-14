export type ScheduledTaskFrequency = "hourly" | "daily" | "weekly" | "monthly";

export type ScheduledTaskStatus = "Success" | "Queued" | "Failed";

export type ScheduledTaskItem = {
  id: string;
  name: string;
  frequency: ScheduledTaskFrequency;
  status: ScheduledTaskStatus;
  nextRunLabel: string;
  nextRunAt: number;
  enabled: boolean;
};

export const scheduledFrequencyLabels: Record<ScheduledTaskFrequency, string> = {
  hourly: "Hourly",
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

export const mockScheduledTasks: ScheduledTaskItem[] = [
  {
    id: "task-1",
    name: "Nightly linting",
    frequency: "daily",
    status: "Success",
    nextRunLabel: "今天 23:30",
    nextRunAt: 1,
    enabled: true,
  },
  {
    id: "task-2",
    name: "Clean up temp files",
    frequency: "weekly",
    status: "Success",
    nextRunLabel: "周日 02:00",
    nextRunAt: 2,
    enabled: true,
  },
  {
    id: "task-3",
    name: "Database vacuum",
    frequency: "monthly",
    status: "Failed",
    nextRunLabel: "12 月 1 日",
    nextRunAt: 3,
    enabled: false,
  },
];
