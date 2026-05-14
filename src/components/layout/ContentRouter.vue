<script setup lang="ts">
import { computed } from "vue";
import EmptySessionPage from "../../pages/EmptySessionPage.vue";
import ActiveSessionPage from "../../pages/ActiveSessionPage.vue";
import ScheduledTasksPage from "../../pages/ScheduledTasksPage.vue";
import SettingsPage from "../../pages/SettingsPage.vue";
import { useTabStore } from "../../stores/Tabs";

const tabStore = useTabStore();

const currentView = computed(() => {
  switch (tabStore.activeTab?.type) {
    case "session":
      return ActiveSessionPage;
    case "scheduled":
      return ScheduledTasksPage;
    case "settings":
      return SettingsPage;
    default:
      return EmptySessionPage;
  }
});
</script>

<template>
  <div class="dsker_content-router">
    <component :is="currentView" />
  </div>
</template>
