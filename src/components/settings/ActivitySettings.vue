<script setup lang="ts">
import { ref } from "vue";

const period = ref("7d");

type ActivityItem = {
  id: string;
  date: string;
  tokens: number;
  requests: number;
  cost: string;
};

const activities = ref<ActivityItem[]>([
  { id: "a1", date: "2026-05-14", tokens: 152340, requests: 47, cost: "$0.38" },
  { id: "a2", date: "2026-05-13", tokens: 89520, requests: 31, cost: "$0.22" },
  { id: "a3", date: "2026-05-12", tokens: 210450, requests: 63, cost: "$0.53" },
]);
</script>

<template>
  <div style="max-width: 720px;">
    <div class="dsker_section-header">
      <h3 class="dsker_section-title">活动</h3>
      <p class="dsker_section-desc">查看令牌使用和 API 调用统计。</p>
    </div>

    <div style="display:flex; gap:16px; margin-bottom:20px;">
      <a-card size="small" :bordered="true" style="flex:1; border-radius:0;">
        <div style="font-size:12px; color:var(--color-text-tertiary); margin-bottom:4px;">总令牌数</div>
        <div style="font-size:22px; font-weight:700;">452,310</div>
      </a-card>
      <a-card size="small" :bordered="true" style="flex:1; border-radius:0;">
        <div style="font-size:12px; color:var(--color-text-tertiary); margin-bottom:4px;">请求数</div>
        <div style="font-size:22px; font-weight:700;">141</div>
      </a-card>
      <a-card size="small" :bordered="true" style="flex:1; border-radius:0;">
        <div style="font-size:12px; color:var(--color-text-tertiary); margin-bottom:4px;">估算费用</div>
        <div style="font-size:22px; font-weight:700;">$1.13</div>
      </a-card>
    </div>

    <div style="margin-bottom:12px;">
      <a-radio-group v-model:value="period" button-style="solid" size="small">
        <a-radio-button value="24h">24 小时</a-radio-button>
        <a-radio-button value="7d">7 天</a-radio-button>
        <a-radio-button value="30d">30 天</a-radio-button>
      </a-radio-group>
    </div>

    <a-table
      :data-source="activities"
      :columns="[
        { title: '日期', dataIndex: 'date', key: 'date' },
        { title: '令牌数', dataIndex: 'tokens', key: 'tokens', customRender: ({ text }: any) => text.toLocaleString() },
        { title: '请求数', dataIndex: 'requests', key: 'requests' },
        { title: '费用', dataIndex: 'cost', key: 'cost' },
      ]"
      :pagination="false"
      size="small"
      :bordered="true"
    />
  </div>
</template>

<style scoped>
.dsker_section-header { margin-bottom: 16px; }
.dsker_section-title { margin: 0 0 4px; font-size: 15px; font-weight: 600; }
.dsker_section-desc { margin: 0 0 16px; font-size: 13px; color: var(--color-text-tertiary); }
</style>
