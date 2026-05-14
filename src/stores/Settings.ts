import { defineStore } from "pinia";
import { computed, ref } from "vue";

export type SettingsTabId =
  | "providers" | "permissions" | "general" | "h5Access" | "adapters"
  | "terminal" | "mcp" | "agents" | "skills" | "plugins"
  | "computerUse" | "activity" | "diagnostics" | "about";

export type SettingsTabItem = { id: SettingsTabId; icon: string; label: string };

export const settingsTabs: SettingsTabItem[] = [
  { id: "providers", icon: "dns", label: "服务商" },
  { id: "permissions", icon: "shield", label: "权限" },
  { id: "general", icon: "tune", label: "通用" },
  { id: "h5Access", icon: "qr_code_2", label: "H5 访问" },
  { id: "adapters", icon: "chat", label: "适配器" },
  { id: "terminal", icon: "terminal", label: "终端" },
  { id: "mcp", icon: "dns", label: "MCP" },
  { id: "agents", icon: "smart_toy", label: "代理" },
  { id: "skills", icon: "auto_awesome", label: "技能" },
  { id: "plugins", icon: "extension", label: "插件" },
  { id: "computerUse", icon: "mouse", label: "Computer Use" },
  { id: "activity", icon: "monitoring", label: "活动" },
  { id: "diagnostics", icon: "monitor_heart", label: "诊断" },
];

export const aboutTab: SettingsTabItem = { id: "about", icon: "info", label: "关于" };

export type PermissionMode = "default" | "acceptEdits" | "plan" | "bypassPermissions";
export type EffortLevel = "low" | "medium" | "high" | "max";
export type ThemeMode = "light" | "dark" | "white";
export type WebSearchMode = "auto" | "deepseek" | "tavily" | "brave" | "disabled";

export type ProviderItem = { id: string; name: string; description: string; baseUrl: string; apiFormat: string; presetId: string; presetName: string; model: string; isActive: boolean; isOfficial: boolean; isDefault: boolean };
export type AgentItem = { id: string; name: string; description: string; source: string; tools: number; color: string };
export type SkillItem = { id: string; name: string; description: string; enabled: boolean };
export type PluginItem = { id: string; name: string; description: string; enabled: boolean };

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
