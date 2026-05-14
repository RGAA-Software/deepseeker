<script setup lang="ts">
import { useSettingsStore } from "../../stores/Settings";

const store = useSettingsStore();
</script>

<template>
  <div style="max-width: 640px;">
    <div class="dsker_section-header">
      <h3 class="dsker_section-title">服务商</h3>
      <p class="dsker_section-desc">管理 API 服务商以访问模型。</p>
    </div>

    <div style="margin-bottom: 8px;">
      <a-button type="primary" ghost size="small" @click="console.log('add provider')">
        <template #icon><plus-outlined /></template>
        添加服务商
      </a-button>
    </div>

    <a-card
      v-for="p in store.providers"
      :key="p.id"
      size="small"
      :class="['dsker_provider-card', { 'dsker_provider-card--active': p.isActive }]"
      :bordered="true"
      hoverable
    >
      <div class="dsker_provider-card__body">
        <a-badge :status="p.isActive ? 'success' : 'default'" />
        <div class="dsker_provider-card__info">
          <div class="dsker_provider-card__title">
            <span>{{ p.name }}</span>
            <a-tag v-if="p.isDefault" color="blue" style="font-size:10px; line-height:1; padding:0 6px; margin-left:6px;">默认</a-tag>
            <a-tag v-if="p.isOfficial" color="green" style="font-size:10px; line-height:1; padding:0 6px; margin-left:4px;">官方</a-tag>
          </div>
          <div class="dsker_provider-card__meta">{{ p.description }}</div>
        </div>
        <div class="dsker_provider-card__actions">
          <a-button v-if="!p.isActive" type="link" size="small" @click="store.toggleProviderActive(p.id)">设为默认</a-button>
          <a-button type="link" size="small">编辑</a-button>
          <a-popconfirm title="确定删除？" @confirm="store.deleteProvider(p.id)">
            <a-button type="link" size="small" danger>删除</a-button>
          </a-popconfirm>
        </div>
      </div>
    </a-card>
  </div>
</template>

<style scoped>
.dsker_section-header {
  margin-bottom: 16px;
}
.dsker_section-title {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 600;
}
.dsker_section-desc {
  margin: 0;
  font-size: 13px;
  color: var(--color-text-tertiary);
}
.dsker_provider-card {
  margin-bottom: 8px;
  border-radius: 12px;
}
.dsker_provider-card--active {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.16);
}
.dsker_provider-card__body {
  display: flex;
  align-items: center;
  gap: 12px;
}
.dsker_provider-card__info {
  flex: 1;
  min-width: 0;
}
.dsker_provider-card__title {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 2px;
}
.dsker_provider-card__meta {
  font-size: 12px;
  color: var(--color-text-tertiary);
}
.dsker_provider-card__actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 180ms;
}
.dsker_provider-card:hover .dsker_provider-card__actions {
  opacity: 1;
}
</style>
