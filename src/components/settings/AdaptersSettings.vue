<script setup lang="ts">
import { ref } from "vue";

type Adapter = {
  id: string;
  name: string;
  platform: string;
  description: string;
  enabled: boolean;
};

const adapters = ref<Adapter[]>([
  { id: "telegram", name: "Telegram 适配器", platform: "Telegram", description: "通过 Telegram Bot 与 DeepSeeker 交互。", enabled: false },
  { id: "feishu", name: "飞书适配器", platform: "飞书", description: "通过飞书应用与 DeepSeeker 交互。", enabled: false },
  { id: "dingtalk", name: "钉钉适配器", platform: "钉钉", description: "通过钉钉机器人接收 DeepSeeker 通知。", enabled: false },
  { id: "wechat", name: "企业微信适配器", platform: "企业微信", description: "通过企业微信应用与 DeepSeeker 交互。", enabled: false },
]);

function toggleAdapter(id: string) {
  const a = adapters.value.find(a => a.id === id);
  if (a) a.enabled = !a.enabled;
}
</script>

<template>
  <div style="max-width: 640px;">
    <div class="dsker_section-header">
      <h3 class="dsker_section-title">适配器</h3>
      <p class="dsker_section-desc">配置 IM 平台适配器以扩展 DeepSeeker 的交互渠道。</p>
    </div>

    <a-card
      v-for="adapter in adapters"
      :key="adapter.id"
      size="small"
      :bordered="true"
      style="border-radius:12px; margin-bottom:8px;"
    >
      <div style="display:flex; align-items:center; gap:12px;">
        <div style="flex:1; min-width:0;">
          <div style="display:flex; align-items:center; gap:6px; margin-bottom:2px;">
            <span style="font-size:14px; font-weight:500;">{{ adapter.name }}</span>
            <a-tag style="font-size:10px; line-height:1; padding:0 6px;">{{ adapter.platform }}</a-tag>
          </div>
          <div style="font-size:12px; color:var(--color-text-tertiary);">{{ adapter.description }}</div>
        </div>
        <a-switch :checked="adapter.enabled" size="small" @change="toggleAdapter(adapter.id)" />
      </div>
    </a-card>
  </div>
</template>

<style scoped>
.dsker_section-header { margin-bottom: 16px; }
.dsker_section-title { margin: 0 0 4px; font-size: 15px; font-weight: 600; }
.dsker_section-desc { margin: 0; font-size: 13px; color: var(--color-text-tertiary); }
</style>
