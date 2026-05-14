<script setup lang="ts">
import { ref } from "vue";

const fontSize = ref(13);
const fontFamily = ref("JetBrains Mono");
const cursorStyle = ref("block");
const scrollback = ref(5000);
const shellPath = ref("");
</script>

<template>
  <div style="max-width: 640px;">
    <div class="dsker_section-header">
      <h3 class="dsker_section-title">终端</h3>
      <p class="dsker_section-desc">配置集成终端的显示和行为。</p>
    </div>

    <a-card size="small" :bordered="true" style="border-radius:0;">
      <a-form layout="vertical" style="max-width:400px;">
        <a-form-item label="字号">
          <a-input-number v-model:value="fontSize" :min="10" :max="24" style="width:100%;" />
        </a-form-item>
        <a-form-item label="字体">
          <a-select v-model:value="fontFamily">
            <a-select-option value="JetBrains Mono">JetBrains Mono</a-select-option>
            <a-select-option value="Cascadia Code">Cascadia Code</a-select-option>
            <a-select-option value="Fira Code">Fira Code</a-select-option>
            <a-select-option value="monospace">monospace</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="光标样式">
          <a-select v-model:value="cursorStyle">
            <a-select-option value="block">方块</a-select-option>
            <a-select-option value="underline">下划线</a-select-option>
            <a-select-option value="bar">竖线</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="回滚行数">
          <a-input-number v-model:value="scrollback" :min="1000" :max="50000" :step="1000" style="width:100%;" />
        </a-form-item>
        <a-form-item label="Shell 路径（可选）">
          <a-input v-model:value="shellPath" placeholder="留空则使用系统默认" />
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<style scoped>
.dsker_section-header { margin-bottom: 16px; }
.dsker_section-title { margin: 0 0 4px; font-size: 15px; font-weight: 600; }
.dsker_section-desc { margin: 0 0 16px; font-size: 13px; color: var(--color-text-tertiary); }
</style>
