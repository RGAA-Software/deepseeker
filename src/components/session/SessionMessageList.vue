<script setup lang="ts">
import type { ChatMessage } from "../../stores/Sessions";
import SessionMessageItem from "./SessionMessageItem.vue";

defineProps<{
  messages: ChatMessage[];
}>();
</script>

<template>
  <div class="dsker_session-message-list">
    <SessionMessageItem
      v-for="message in messages"
      :key="message.id"
      :message="message"
    />
  </div>
</template>
