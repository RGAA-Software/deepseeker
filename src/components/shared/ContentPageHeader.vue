<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  badge?: string;
}>();
</script>

<template>
  <div class="dsker_content-page__header">
    <div>
      <p class="dsker_content-page__eyebrow">{{ eyebrow }}</p>
      <h1 class="dsker_content-page__title">{{ title }}</h1>
    </div>
    <div v-if="badge" class="dsker_content-page__badge">{{ badge }}</div>
    <slot v-else name="actions" />
  </div>
</template>
