<script setup lang="ts">
import { ref } from "vue";

type McpServer = {
  id: string;
  name: string;
  command: string;
  args: string;
  enabled: boolean;
};

const servers = ref<McpServer[]>([
  { id: "m1", name: "文件系统", command: "npx", args: "-y @modelcontextprotocol/server-filesystem", enabled: true },
  { id: "m2", name: "GitHub", command: "npx", args: "-y @modelcontextprotocol/server-github", enabled: false },
]);

function toggleServer(id: string) {
  const s = servers.value.find(s => s.id === id);
  if (s) s.enabled = !s.enabled;
}
</script>

<template>
  <div style="max-width: 640px;">
    <div class="dsker_section-header">
      <h3 class="dsker_section-title">MCP 服务器</h3>
      <p class="dsker_section-desc">管理 Model Context Protocol 服务器。</p>
    </div>

    <a-button type="primary" ghost size="small" style="margin-bottom:16px;">
      <template #icon><plus-outlined /></template>
      添加 MCP 服务器
    </a-button>

    <a-card
      v-for="server in servers"
      :key="server.id"
      size="small"
      :bordered="true"
      style="border-radius:12px; margin-bottom:8px;"
    >
      <div style="display:flex; align-items:center; gap:12px;">
        <div style="flex:1; min-width:0;">
          <div style="font-size:14px; font-weight:500; margin-bottom:2px;">{{ server.name }}</div>
          <div style="font-size:12px; color:var(--color-text-tertiary);">
            <code style="font-size:11px;">{{ server.command }} {{ server.args }}</code>
          </div>
        </div>
        <a-switch :checked="server.enabled" size="small" @change="toggleServer(server.id)" />
      </div>
    </a-card>
  </div>
</template>

<style scoped>
.dsker_section-header { margin-bottom: 16px; }
.dsker_section-title { margin: 0 0 4px; font-size: 15px; font-weight: 600; }
.dsker_section-desc { margin: 0; font-size: 13px; color: var(--color-text-tertiary); }
</style>
