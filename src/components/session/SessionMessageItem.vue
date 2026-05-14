<script setup lang="ts">
import type { ChatMessage } from "../../stores/Sessions";

defineProps<{
  message: ChatMessage;
}>();
</script>

<template>
  <div
    class="dsker_message"
    :class="message.role === 'user' ? 'dsker_message--user' : message.role === 'assistant' ? 'dsker_message--assistant' : 'dsker_tool-card'"
  >
    <template v-if="message.role === 'tool'">
      <div class="dsker_tool-card__label">TOOL CALL</div>
      <div class="dsker_tool-card__title">{{ message.label ?? "tool" }}</div>
      <p class="dsker_tool-card__body">{{ message.content }}</p>
    </template>
    <template v-else>
      <div class="dsker_message__label">{{ message.role === "user" ? "User" : "DeepSeek" }}</div>
      <p>{{ message.content }}</p>
    </template>
  </div>
</template>
