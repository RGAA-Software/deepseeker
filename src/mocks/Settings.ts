export type SettingsTabId =
  | "providers"
  | "permissions"
  | "general"
  | "h5Access"
  | "adapters"
  | "terminal"
  | "mcp"
  | "agents"
  | "skills"
  | "plugins"
  | "computerUse"
  | "activity"
  | "diagnostics"
  | "about";

export type SettingsTabItem = {
  id: SettingsTabId;
  icon: string;
  label: string;
};

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

export const aboutTab: SettingsTabItem = {
  id: "about",
  icon: "info",
  label: "关于",
};

export type PermissionMode = "default" | "acceptEdits" | "plan" | "bypassPermissions";

export type EffortLevel = "low" | "medium" | "high" | "max";

export type ThemeMode = "light" | "dark" | "white";

export type WebSearchMode = "auto" | "deepseek" | "tavily" | "brave" | "disabled";

export type ProviderItem = {
  id: string;
  name: string;
  description: string;
  baseUrl: string;
  apiFormat: string;
  presetId: string;
  presetName: string;
  model: string;
  isActive: boolean;
  isOfficial: boolean;
  isDefault: boolean;
};

export type AgentSource = "built-in" | "userSettings" | "plugin";

export type AgentItem = {
  id: string;
  name: string;
  description: string;
  source: AgentSource;
  tools: number;
  color: string;
};

export type SkillItem = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
};

export type PluginItem = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
};

export type ScheduledTask = {
  id: string;
  name: string;
  cron: string;
  enabled: boolean;
  lastRun: string | null;
  lastResult: "Success" | "Failed" | "Queued" | null;
};
