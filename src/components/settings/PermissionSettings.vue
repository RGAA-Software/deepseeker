<script setup lang="ts">
import { useSettingsStore } from "../../stores/Settings";
import type { PermissionMode } from "../../mocks/Settings";

const store = useSettingsStore();

const MODES: { mode: PermissionMode; label: string; desc: string }[] = [
  { mode: "default", label: "默认模式", desc: "每次工具调用都需要批准。" },
  { mode: "acceptEdits", label: "接受编辑", desc: "自动批准文件编辑操作。" },
  { mode: "plan", label: "规划模式", desc: "代理规划后自动批准文件操作。" },
  { mode: "bypassPermissions", label: "绕过权限", desc: "完全绕过所有权限检查（谨慎使用）。" },
];
</script>

<template>
  <div style="max-width: 640px;">
    <div class="dsker_section-header">
      <h3 class="dsker_section-title">权限</h3>
      <p class="dsker_section-desc">控制终端、文件系统和工作区访问能力。</p>
    </div>

    <div class="dsker_permission-list">
      <a-card
        v-for="m in MODES"
        :key="m.mode"
        size="small"
        :class="['dsker_permission-card', { 'dsker_permission-card--active': store.permissionMode === m.mode }]"
        hoverable
        @click="store.permissionMode = m.mode"
      >
        <div class="dsker_permission-card__body">
          <div style="flex:1; min-width:0;">
            <div class="dsker_permission-card__label">{{ m.label }}</div>
            <div class="dsker_permission-card__desc">{{ m.desc }}</div>
          </div>
          <check-circle-filled
            v-if="store.permissionMode === m.mode"
            class="dsker_permission-check"
          />
        </div>
      </a-card>
    </div>
  </div>
</template>

<style scoped>
.dsker_section-header { margin-bottom: 16px; }
.dsker_section-title { margin: 0 0 4px; font-size: 15px; font-weight: 600; }
.dsker_section-desc { margin: 0; font-size: 13px; color: var(--color-text-tertiary); }
.dsker_permission-list { display: flex; flex-direction: column; gap: 8px; }
.dsker_permission-card { border-radius: 12px; cursor: pointer; }
.dsker_permission-card--active {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.16);
}
.dsker_permission-card__body { display: flex; align-items: center; gap: 12px; }
.dsker_permission-card__label { font-size: 14px; font-weight: 500; margin-bottom: 2px; }
.dsker_permission-card__desc { font-size: 12px; color: var(--color-text-tertiary); }
.dsker_permission-check { font-size: 18px; color: var(--color-primary); flex-shrink: 0; }
</style>
