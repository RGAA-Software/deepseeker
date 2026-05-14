<script setup lang="ts">
import { useSettingsStore } from "../../stores/Settings";

const store = useSettingsStore();
</script>

<template>
  <div style="max-width: 640px;">
    <div class="dsker_section-header">
      <h3 class="dsker_section-title">插件</h3>
      <p class="dsker_section-desc">管理安装的插件。</p>
    </div>

    <a-card
      v-for="p in store.plugins"
      :key="p.id"
      size="small"
      :bordered="true"
      style="border-radius:12px; margin-bottom:8px;"
    >
      <div style="display:flex; align-items:center; gap:12px;">
        <div style="flex:1; min-width:0;">
          <div style="font-size:14px; font-weight:500; margin-bottom:2px;">{{ p.name }}</div>
          <div style="font-size:12px; color:var(--color-text-tertiary);">{{ p.description }}</div>
        </div>
        <a-switch :checked="p.enabled" size="small" />
      </div>
    </a-card>
  </div>
</template>

<style scoped>
.dsker_section-header { margin-bottom: 16px; }
.dsker_section-title { margin: 0 0 4px; font-size: 15px; font-weight: 600; }
.dsker_section-desc { margin: 0; font-size: 13px; color: var(--color-text-tertiary); }
</style>
