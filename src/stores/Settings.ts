import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {
  settingsTabs,
  aboutTab,
  type SettingsTabId,
  type PermissionMode,
  type EffortLevel,
  type ThemeMode,
  type WebSearchMode,
  type ProviderItem,
  type AgentItem,
  type SkillItem,
  type PluginItem,
} from "../mocks/Settings";

export const useSettingsStore = defineStore("settings", () => {
  const activeTabId = ref<SettingsTabId>("providers");

  function setActiveTab(tabId: SettingsTabId) {
    activeTabId.value = tabId;
  }

  const allTabs = computed(() => settingsTabs);
  const bottomTab = computed(() => [aboutTab]);

  // Provider state
  const providers = ref<ProviderItem[]>([
    {
      id: "official",
      name: "DeepSeek 官方",
      description: "DeepSeek 原生接入，无需 API 密钥。",
      baseUrl: "https://api.deepseek.com",
      apiFormat: "deepseek",
      presetId: "official",
      presetName: "Official",
      model: "deepseek-chat",
      isActive: true,
      isOfficial: true,
      isDefault: true,
    },
    {
      id: "openai",
      name: "OpenAI API",
      description: "通过 API Key 访问 GPT 系列模型。",
      baseUrl: "https://api.openai.com",
      apiFormat: "openai_chat",
      presetId: "openai",
      presetName: "OpenAI",
      model: "gpt-4o",
      isActive: false,
      isOfficial: false,
      isDefault: false,
    },
  ]);

  function toggleProviderActive(id: string) {
    providers.value = providers.value.map((p) => ({
      ...p,
      isActive: p.id === id,
      isDefault: p.id === id,
    }));
  }

  function deleteProvider(id: string) {
    providers.value = providers.value.filter((p) => p.id !== id);
  }

  // Permission mode
  const permissionMode = ref<PermissionMode>("default");

  // General
  const theme = ref<ThemeMode>("light");
  const locale = ref<"en" | "zh">("zh");
  const effortLevel = ref<EffortLevel>("medium");
  const thinkingEnabled = ref(true);
  const desktopNotificationsEnabled = ref(false);
  const skipWebFetchPreflight = ref(false);
  const webSearchMode = ref<WebSearchMode>("disabled");
  const tavilyApiKey = ref("");
  const braveApiKey = ref("");

  // Agents
  const agents = ref<AgentItem[]>([
    { id: "a1", name: "代码审查员", description: "审查代码变更并给出改进建议", source: "built-in", tools: 5, color: "#3b82f6" },
    { id: "a2", name: "测试生成器", description: "自动生成单元测试用例", source: "built-in", tools: 3, color: "#22c55e" },
  ]);

  // Skills
  const skills = ref<SkillItem[]>([
    { id: "s1", name: "Git 工作流", description: "管理 Git 操作和提交工作流", enabled: true },
    { id: "s2", name: "Docker 助手", description: "Docker 容器和镜像管理", enabled: false },
  ]);

  // Plugins
  const plugins = ref<PluginItem[]>([
    { id: "p1", name: "ESLint 集成", description: "在编辑时自动检查代码质量", enabled: true },
  ]);

  // H5 access
  const h5AccessEnabled = ref(false);
  const h5PublicBaseUrl = ref("");
  const h5TokenPreview = ref<string | null>(null);
  const h5GeneratedToken = ref<string | null>(null);

  // Scheduled tasks delegated to separate store

  return {
    activeTabId,
    setActiveTab,
    allTabs,
    bottomTab,

    providers,
    toggleProviderActive,
    deleteProvider,

    permissionMode,
    theme,
    locale,
    effortLevel,
    thinkingEnabled,
    desktopNotificationsEnabled,
    skipWebFetchPreflight,
    webSearchMode,
    tavilyApiKey,
    braveApiKey,

    agents,
    skills,
    plugins,

    h5AccessEnabled,
    h5PublicBaseUrl,
    h5TokenPreview,
    h5GeneratedToken,
  };
});
