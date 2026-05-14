<script setup lang="ts">
import { useSettingsStore } from "../../stores/Settings";

const store = useSettingsStore();
</script>

<template>
  <div style="max-width: 720px;">
    <div class="dsker_section-header">
      <h3 class="dsker_section-title">H5 访问</h3>
      <p class="dsker_section-desc">通过手机浏览器或外部设备访问 DeepSeeker。</p>
    </div>

    <a-card size="small" class="dsker_h5-card" :bordered="true">
      <div class="dsker_h5-toggle-row">
        <div style="display:flex; align-items:flex-start; gap:12px;">
          <a-switch :checked="store.h5AccessEnabled" @change="store.h5AccessEnabled = !store.h5AccessEnabled" />
          <div>
            <div style="font-size:14px; font-weight:500;">启用 H5 访问</div>
            <div style="font-size:12px; color:var(--color-text-tertiary);">生成一次性链接和令牌供外部设备访问。</div>
          </div>
        </div>
        <a-tag :color="store.h5AccessEnabled ? 'success' : 'default'">
          {{ store.h5AccessEnabled ? '已启用' : '已禁用' }}
        </a-tag>
      </div>

      <a-divider style="margin:16px 0;" />

      <div>
        <label style="font-size:13px; font-weight:500; display:block; margin-bottom:4px;">公网地址</label>
        <a-input
          v-model:value="store.h5PublicBaseUrl"
          placeholder="https://your-domain.com"
          style="margin-bottom:8px;"
        />
        <div style="font-size:12px; color:var(--color-text-tertiary);">
          确保此地址可以从外部网络访问。
        </div>
      </div>
    </a-card>
  </div>
</template>

<style scoped>
.dsker_section-header { margin-bottom: 16px; }
.dsker_section-title { margin: 0 0 4px; font-size: 15px; font-weight: 600; }
.dsker_section-desc { margin: 0; font-size: 13px; color: var(--color-text-tertiary); }
.dsker_h5-card { border-radius: 12px; }
.dsker_h5-toggle-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
</style>
