import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {
  mockScheduledTasks,
  scheduledFrequencyLabels,
  type ScheduledTaskFrequency,
  type ScheduledTaskItem,
  type ScheduledTaskStatus,
} from "../mocks/Scheduled";
import {
  readVersionedLocalState,
  writeVersionedLocalState,
} from "../utils/LocalState";

const SCHEDULED_STORAGE_KEY = "deepseeker.scheduled";
const SCHEDULED_STORAGE_VERSION = 1;

type ScheduledTasksState = {
  tasks: ScheduledTaskItem[];
};

function buildNextRun(frequency: ScheduledTaskFrequency) {
  switch (frequency) {
    case "hourly":
      return {
        label: "1 小时后",
        sortOrder: Date.now() + 60 * 60 * 1000,
      };
    case "daily":
      return {
        label: "明天 09:00",
        sortOrder: Date.now() + 24 * 60 * 60 * 1000,
      };
    case "weekly":
      return {
        label: "下周一 09:00",
        sortOrder: Date.now() + 7 * 24 * 60 * 60 * 1000,
      };
    case "monthly":
      return {
        label: "下月 1 日 09:00",
        sortOrder: Date.now() + 30 * 24 * 60 * 60 * 1000,
      };
  }
}

function buildStatus(enabled: boolean): ScheduledTaskStatus {
  return enabled ? "Queued" : "Success";
}

export const useScheduledTasksStore = defineStore("scheduledTasks", () => {
  const stored = readVersionedLocalState<ScheduledTasksState>(
    SCHEDULED_STORAGE_KEY,
    SCHEDULED_STORAGE_VERSION,
    { tasks: mockScheduledTasks },
  );
  const tasks = ref<ScheduledTaskItem[]>(stored.tasks);

  function persist() {
    writeVersionedLocalState(
      SCHEDULED_STORAGE_KEY,
      SCHEDULED_STORAGE_VERSION,
      {
        tasks: tasks.value,
      },
    );
  }

  const stats = computed(() => {
    const nextTask = [...tasks.value]
      .filter((task) => task.enabled)
      .sort((left, right) => left.nextRunAt - right.nextRunAt)[0];

    return [
      {
        label: "总任务数",
        value: String(tasks.value.length),
      },
      {
        label: "活跃",
        value: String(tasks.value.filter((task) => task.enabled).length),
      },
      {
        label: "下次运行",
        value: nextTask?.nextRunLabel ?? "暂无",
      },
    ];
  });

  function createTask(name: string, frequency: ScheduledTaskFrequency) {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }

    const nextRun = buildNextRun(frequency);
    tasks.value = [
      {
        id: `task-${Date.now()}`,
        name: trimmed,
        frequency,
        status: "Queued",
        nextRunLabel: nextRun.label,
        nextRunAt: nextRun.sortOrder,
        enabled: true,
      },
      ...tasks.value,
    ];
    persist();
  }

  function toggleTask(taskId: string) {
    tasks.value = tasks.value.map((task) =>
      task.id === taskId
        ? {
            ...task,
            enabled: !task.enabled,
            status: buildStatus(!task.enabled),
          }
        : task,
    );
    persist();
  }

  function runTaskNow(taskId: string) {
    tasks.value = tasks.value.map((task) =>
      task.id === taskId
        ? {
            ...task,
            enabled: true,
            status: "Queued",
            nextRunLabel: "刚刚加入队列",
            nextRunAt: Date.now(),
          }
        : task,
    );
    persist();
  }

  return {
    createTask,
    runTaskNow,
    scheduledFrequencyLabels,
    stats,
    tasks,
    toggleTask,
  };
});
