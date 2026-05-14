<script setup lang="ts">
import { computed, ref } from "vue";
import ContentPageHeader from "../components/shared/ContentPageHeader.vue";
import ScheduledStatsGrid from "../components/scheduled/ScheduledStatsGrid.vue";
import ScheduledTasksTable from "../components/scheduled/ScheduledTasksTable.vue";
import { useScheduledTasksStore } from "../stores/ScheduledTasks";
import type { ScheduledTaskFrequency } from "../mocks/Scheduled";

const scheduledStore = useScheduledTasksStore();
const showCreateTaskModal = ref(false);
const taskName = ref("");
const taskFrequency = ref<ScheduledTaskFrequency>("daily");

const canSubmit = computed(() => taskName.value.trim().length > 0);

function openCreateTaskModal() {
  showCreateTaskModal.value = true;
}

function closeCreateTaskModal() {
  showCreateTaskModal.value = false;
  taskName.value = "";
  taskFrequency.value = "daily";
}

function submitTask() {
  if (!canSubmit.value) {
    return;
  }

  scheduledStore.createTask(taskName.value, taskFrequency.value);
  closeCreateTaskModal();
}
</script>

<template>
  <section class="dsker_content-page">
    <ContentPageHeader eyebrow="定时任务" title="自动化工作流">
      <template #actions>
        <a-button class="dsker_run-button" type="primary" @click="openCreateTaskModal">新建任务</a-button>
      </template>
    </ContentPageHeader>

    <ScheduledStatsGrid :stats="scheduledStore.stats" />
    <ScheduledTasksTable
      :tasks="scheduledStore.tasks"
      @run="scheduledStore.runTaskNow"
      @toggle="scheduledStore.toggleTask"
    />

    <a-modal
      :open="showCreateTaskModal"
      title="添加定时任务"
      ok-text="创建任务"
      cancel-text="取消"
      :ok-button-props="{ disabled: !canSubmit, class: 'dsker_run-button' }"
      @ok="submitTask"
      @cancel="closeCreateTaskModal"
    >
      <a-form layout="vertical">
        <a-form-item label="任务名称">
          <a-input v-model:value="taskName" placeholder="例如：Sync staging database" />
        </a-form-item>
        <a-form-item label="执行频率">
          <a-select v-model:value="taskFrequency">
            <a-select-option value="hourly">Hourly</a-select-option>
            <a-select-option value="daily">Daily</a-select-option>
            <a-select-option value="weekly">Weekly</a-select-option>
            <a-select-option value="monthly">Monthly</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </section>
</template>
