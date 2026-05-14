<script setup lang="ts">
defineProps<{
  stats: {
    label: string;
    value: string;
  }[];
}>();
</script>

<template>
  <div class="dsker_stats-grid">
    <div
      v-for="stat in stats"
      :key="stat.label"
    >
      <a-card class="dsker_stat-card" :bordered="false">
        <span class="dsker_stat-card__label">{{ stat.label }}</span>
        <strong class="dsker_stat-card__value">{{ stat.value }}</strong>
      </a-card>
    </div>
  </div>
</template>
