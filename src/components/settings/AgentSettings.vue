<script setup lang="ts">
import { useSettingsStore } from "../../stores/Settings";

const store = useSettingsStore();

const SOURCE_LABEL: Record<string, string> = {
  "built-in": "内置",
  userSettings: "用户设置",
  plugin: "插件",
};
</script>

<template>
  <div style="max-width: 720px;">
    <div class="dsker_section-header">
      <h3 class="dsker_section-title">代理</h3>
      <p class="dsker_section-desc">管理可用的 AI 代理。</p>
    </div>

    <div v-for="agent in store.agents" :key="agent.id">
      <a-card size="small" :bordered="true" hoverable style="border-radius:12px; margin-bottom:8px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <a-badge :color="agent.color" />
          <div style="flex:1; min-width:0;">
            <div style="font-size:14px; font-weight:500; display:flex; align-items:center; gap:6px;">
              {{ agent.name }}
              <a-tag style="font-size:10px; line-height:1; padding:0 6px;">{{ SOURCE_LABEL[agent.source] || agent.source }}</a-tag>
            </div>
            <div style="font-size:12px; color:var(--color-text-tertiary);">{{ agent.description }}</div>
          </div>
          <div style="font-size:12px; color:var(--color-text-tertiary);">{{ agent.tools }} 个工具</div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<style scoped>
.dsker_section-header { margin-bottom: 16px; }
.dsker_section-title { margin: 0 0 4px; font-size: 15px; font-weight: 600; }
.dsker_section-desc { margin: 0; font-size: 13px; color: var(--color-text-tertiary); }
</style>
