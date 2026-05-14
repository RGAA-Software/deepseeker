<script setup lang="ts">
import { computed } from "vue";
import {
  scheduledFrequencyLabels,
  type ScheduledTaskItem,
} from "../../stores/ScheduledTasks";

const props = defineProps<{
  tasks: ScheduledTaskItem[];
}>();

const emit = defineEmits<{
  run: [taskId: string];
  toggle: [taskId: string];
}>();

const columns = computed(() => [
  {
    title: "任务名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "频率",
    dataIndex: "frequency",
    key: "frequency",
  },
  {
    title: "结果",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "下次执行",
    dataIndex: "nextRunLabel",
    key: "nextRunLabel",
  },
  {
    title: "操作",
    key: "actions",
  },
]);

function frequencyLabel(frequency: ScheduledTaskItem["frequency"]) {
  return scheduledFrequencyLabels[frequency];
}
</script>

<template>
  <div class="dsker_content-page__panel">
    <a-table
      class="dsker_tasks-table"
      :columns="columns"
      :data-source="props.tasks"
      :pagination="false"
      row-key="id"
      size="middle"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'frequency'">
          {{ frequencyLabel(record.frequency) }}
        </template>

        <template v-else-if="column.key === 'status'">
          <span class="dsker_result-badge" :data-status="record.status">{{ record.status }}</span>
        </template>

        <template v-else-if="column.key === 'actions'">
          <div class="dsker_table-row__actions">
            <a-button class="dsker_pill-button" type="default" @click="emit('run', record.id)">
              立即运行
            </a-button>
            <a-button class="dsker_pill-button" type="default" @click="emit('toggle', record.id)">
              {{ record.enabled ? "停用" : "启用" }}
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>
