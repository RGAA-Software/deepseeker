<script setup lang="ts">
import type { SessionItem } from "../../stores/Sessions";
import SessionRow from "./SessionRow.vue";

defineProps<{
  label: string;
  sessions: SessionItem[];
}>();
</script>

<template>
  <div v-if="sessions.length" class="dsker_session-group">
    <div class="dsker_session-group__header">
      <span>{{ label }}</span>
    </div>

    <SessionRow
      v-for="session in sessions"
      :key="session.id"
      :session="session"
    />
  </div>
</template>
