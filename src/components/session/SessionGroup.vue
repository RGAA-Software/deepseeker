<script setup lang="ts">
import { ref } from "vue";
import type { SessionItem } from "../../stores/Sessions";
import SessionRow from "./SessionRow.vue";

defineProps<{
  label: string;
  sessions: SessionItem[];
}>();

const renamingSessionId = ref<string | null>(null);

function onStartRename(sessionId: string) {
  renamingSessionId.value = sessionId || null;
}
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
      :renaming-session-id="renamingSessionId"
      @start-rename="onStartRename"
    />
  </div>
</template>
