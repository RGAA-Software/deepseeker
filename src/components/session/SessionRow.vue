<script setup lang="ts">
import type { SessionItem } from "../../mocks/Sessions";
import { useSessionStore } from "../../stores/Sessions";
import { useTabStore } from "../../stores/Tabs";

defineProps<{
  session: SessionItem;
}>();

const sessionStore = useSessionStore();
const tabStore = useTabStore();
</script>

<template>
  <button
    class="dsker_session-row"
    :class="session.active ? 'dsker_session-row--active' : 'dsker_session-row--idle'"
    type="button"
    @click="
      sessionStore.setActiveSession(session.id);
      tabStore.openSessionTab(session.id, session.title);
    "
  >
    <span class="dsker_session-row__status" />
    <span class="dsker_session-row__title">{{ session.title }}</span>
    <span class="dsker_session-row__time">{{ session.relative }}</span>
  </button>
</template>
