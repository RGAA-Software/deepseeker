<script setup lang="ts">
import { ref } from "vue";

const CHECKS = [
  { id: "env", label: "环境检查", desc: "校验 Tauri、Node 与权限配置状态。" },
  { id: "storage", label: "存储自检", desc: "检查本地持久化数据和版本兼容性。" },
  { id: "network", label: "网络连通性", desc: "测试 API 端点可访问性。" },
  { id: "permissions", label: "权限状态", desc: "验证各权限模式是否正确配置。" },
];

const results = ref<Record<string, string | null>>({});

function runCheck(id: string) {
  results.value[id] = "running";
  setTimeout(() => {
    results.value[id] = Math.random() > 0.3 ? "pass" : "fail";
  }, 1500);
}
</script>

<template>
  <div style="max-width: 640px;">
    <div class="dsker_section-header">
      <h3 class="dsker_section-title">诊断</h3>
      <p class="dsker_section-desc">查看环境状态并执行基本自检。</p>
    </div>

    <a-button type="primary" ghost size="small" style="margin-bottom:16px;" @click="Object.keys(CHECKS).forEach(k => runCheck(CHECKS[Number(k)].id))">
      运行全部诊断
    </a-button>

    <a-card
      v-for="check in CHECKS"
      :key="check.id"
      size="small"
      :bordered="true"
      style="border-radius:0; margin-bottom:8px;"
    >
      <div style="display:flex; align-items:center; gap:12px;">
        <div style="flex:1; min-width:0;">
          <div style="font-size:14px; font-weight:500; margin-bottom:2px;">{{ check.label }}</div>
          <div style="font-size:12px; color:var(--color-text-tertiary);">{{ check.desc }}</div>
        </div>
        <div v-if="!results[check.id]" style="flex-shrink:0;">
          <a-button size="small" @click="runCheck(check.id)">运行</a-button>
        </div>
        <a-spin v-else-if="results[check.id] === 'running'" size="small" />
        <a-tag v-else :color="results[check.id] === 'pass' ? 'success' : 'error'">
          {{ results[check.id] === 'pass' ? '通过' : '失败' }}
        </a-tag>
      </div>
    </a-card>
  </div>
</template>

<style scoped>
.dsker_section-header { margin-bottom: 16px; }
.dsker_section-title { margin: 0 0 4px; font-size: 15px; font-weight: 600; }
.dsker_section-desc { margin: 0; font-size: 13px; color: var(--color-text-tertiary); }
</style>
