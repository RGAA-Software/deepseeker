<script setup lang="ts">
import { ref } from "vue";

const enabled = ref(false);
const screenshotQuality = ref(75);
const maxActionsPerStep = ref(20);
const actionDelayMs = ref(500);
</script>

<template>
  <div style="max-width: 640px;">
    <div class="dsker_section-header">
      <h3 class="dsker_section-title">Computer Use</h3>
      <p class="dsker_section-desc">允许 AI 代理控制您的计算机屏幕和输入设备。</p>
    </div>

    <a-card size="small" :bordered="true" style="border-radius:0; margin-bottom:12px;">
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
        <a-switch v-model:checked="enabled" />
        <div>
          <div style="font-size:14px; font-weight:500;">启用 Computer Use</div>
          <div style="font-size:12px; color:var(--color-text-tertiary);">允许代理进行屏幕截图和模拟输入操作。</div>
        </div>
      </div>
    </a-card>

    <template v-if="enabled">
      <a-card size="small" :bordered="true" style="border-radius:0;">
        <a-form layout="vertical" style="max-width:400px;">
          <a-form-item label="截图质量">
            <a-slider v-model:value="screenshotQuality" :min="10" :max="100" />
          </a-form-item>
          <a-form-item label="每步最大操作数">
            <a-input-number v-model:value="maxActionsPerStep" :min="1" :max="100" style="width:100%;" />
          </a-form-item>
          <a-form-item label="操作间隔 (ms)">
            <a-input-number v-model:value="actionDelayMs" :min="0" :max="5000" :step="100" style="width:100%;" />
          </a-form-item>
        </a-form>
      </a-card>
    </template>
  </div>
</template>

<style scoped>
.dsker_section-header { margin-bottom: 16px; }
.dsker_section-title { margin: 0 0 4px; font-size: 15px; font-weight: 600; }
.dsker_section-desc { margin: 0; font-size: 13px; color: var(--color-text-tertiary); }
</style>
