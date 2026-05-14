<script setup lang="ts">
import { useSettingsStore } from "../../stores/Settings";
import type { EffortLevel, ThemeMode } from "../../mocks/Settings";

const store = useSettingsStore();

const THEMES: { value: ThemeMode; label: string }[] = [
  { value: "light", label: "浅色" },
  { value: "dark", label: "深色" },
  { value: "white", label: "白色" },
];

const LANGUAGES: { value: "en" | "zh"; label: string }[] = [
  { value: "en", label: "English" },
  { value: "zh", label: "中文" },
];

const EFFORTS: { value: EffortLevel; label: string }[] = [
  { value: "low", label: "低" },
  { value: "medium", label: "中" },
  { value: "high", label: "高" },
  { value: "max", label: "最高" },
];
</script>

<template>
  <div style="max-width: 640px;">
    <!-- 外观 -->
    <div class="dsker_section-block">
      <h3 class="dsker_section-title">外观</h3>
      <p class="dsker_section-desc">选择应用的主题外观。</p>
      <a-radio-group :value="store.theme" button-style="solid" size="small">
        <a-radio-button v-for="t in THEMES" :key="t.value" :value="t.value" @click="store.theme = t.value">
          {{ t.label }}
        </a-radio-button>
      </a-radio-group>
    </div>

    <!-- 语言 -->
    <div class="dsker_section-block">
      <h3 class="dsker_section-title">语言</h3>
      <p class="dsker_section-desc">选择界面语言。</p>
      <a-radio-group :value="store.locale" button-style="solid" size="small">
        <a-radio-button v-for="l in LANGUAGES" :key="l.value" :value="l.value" @click="store.locale = l.value">
          {{ l.label }}
        </a-radio-button>
      </a-radio-group>
    </div>

    <!-- 努力程度 -->
    <div class="dsker_section-block">
      <h3 class="dsker_section-title">努力程度</h3>
      <p class="dsker_section-desc">控制模型在生成回复时的投入程度。</p>
      <a-radio-group :value="store.effortLevel" button-style="solid" size="small">
        <a-radio-button v-for="e in EFFORTS" :key="e.value" :value="e.value" @click="store.effortLevel = e.value">
          {{ e.label }}
        </a-radio-button>
      </a-radio-group>
    </div>

    <!-- 思考 -->
    <div class="dsker_section-block">
      <h3 class="dsker_section-title">思考</h3>
      <p class="dsker_section-desc">控制模型是否在回复前进行思考。</p>
      <a-card size="small" class="dsker_toggle-card" :bordered="true">
        <a-space>
          <a-switch :checked="store.thinkingEnabled" @change="store.thinkingEnabled = !store.thinkingEnabled" />
          <span>启用扩展思考</span>
        </a-space>
        <div class="dsker_toggle-hint">启用后模型会在回复前进行更深入的推理。</div>
      </a-card>
    </div>

    <!-- 桌面通知 -->
    <div class="dsker_section-block">
      <h3 class="dsker_section-title">桌面通知</h3>
      <p class="dsker_section-desc">控制桌面通知的显示。</p>
      <a-card size="small" class="dsker_toggle-card" :bordered="true">
        <a-space>
          <a-switch :checked="store.desktopNotificationsEnabled" @change="store.desktopNotificationsEnabled = !store.desktopNotificationsEnabled" />
          <span>启用桌面通知</span>
        </a-space>
      </a-card>
    </div>

    <!-- Web 获取预检 -->
    <div class="dsker_section-block">
      <h3 class="dsker_section-title">Web 获取预检</h3>
      <p class="dsker_section-desc">跳过 Web 获取操作的预检查。</p>
      <a-card size="small" class="dsker_toggle-card" :bordered="true">
        <a-space>
          <a-switch :checked="store.skipWebFetchPreflight" @change="store.skipWebFetchPreflight = !store.skipWebFetchPreflight" />
          <span>跳过预检</span>
        </a-space>
        <div class="dsker_toggle-hint">启用后 Web 获取操作将不再进行安全检查。</div>
      </a-card>
    </div>

    <!-- 网络搜索 -->
    <div class="dsker_section-block">
      <h3 class="dsker_section-title">网络搜索</h3>
      <p class="dsker_section-desc">配置网络搜索模式和 API 密钥。</p>
      <a-card size="small" class="dsker_toggle-card" :bordered="true">
        <a-radio-group :value="store.webSearchMode" button-style="solid" size="small" style="margin-bottom: 16px;">
          <a-radio-button value="auto" @click="store.webSearchMode = 'auto'">自动</a-radio-button>
          <a-radio-button value="tavily" @click="store.webSearchMode = 'tavily'">Tavily</a-radio-button>
          <a-radio-button value="brave" @click="store.webSearchMode = 'brave'">Brave</a-radio-button>
          <a-radio-button value="deepseek" @click="store.webSearchMode = 'deepseek'">DeepSeek</a-radio-button>
          <a-radio-button value="disabled" @click="store.webSearchMode = 'disabled'">禁用</a-radio-button>
        </a-radio-group>
        <a-input-password
          v-if="store.webSearchMode === 'tavily'"
          v-model:value="store.tavilyApiKey"
          placeholder="tvly-..."
          style="margin-bottom: 8px;"
        />
        <a-input-password
          v-if="store.webSearchMode === 'brave'"
          v-model:value="store.braveApiKey"
          placeholder="BSA..."
        />
      </a-card>
    </div>
  </div>
</template>

<style scoped>
.dsker_section-block {
  margin-bottom: 24px;
}
.dsker_section-title {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 600;
}
.dsker_section-desc {
  margin: 0 0 12px;
  font-size: 13px;
  color: var(--color-text-tertiary);
}
.dsker_toggle-card {
  border-radius: 12px;
}
.dsker_toggle-hint {
  margin-top: 8px;
  font-size: 12px;
  color: var(--color-text-tertiary);
}
</style>
