<script setup lang="ts">
import { computed } from "vue";
import { useSettingsStore } from "../stores/Settings";
import { aboutTab } from "../stores/Settings";
import ProviderSettings from "../components/settings/ProviderSettings.vue";
import PermissionSettings from "../components/settings/PermissionSettings.vue";
import GeneralSettings from "../components/settings/GeneralSettings.vue";
import H5AccessSettings from "../components/settings/H5AccessSettings.vue";
import AgentSettings from "../components/settings/AgentSettings.vue";
import SkillSettings from "../components/settings/SkillSettings.vue";
import PluginSettings from "../components/settings/PluginSettings.vue";
import AdaptersSettings from "../components/settings/AdaptersSettings.vue";
import TerminalSettings from "../components/settings/TerminalSettings.vue";
import McpSettings from "../components/settings/McpSettings.vue";
import ComputerUseSettings from "../components/settings/ComputerUseSettings.vue";
import ActivitySettings from "../components/settings/ActivitySettings.vue";
import DiagnosticsSettings from "../components/settings/DiagnosticsSettings.vue";
import AboutSettings from "../components/settings/AboutSettings.vue";

const store = useSettingsStore();

const SVGS = [
  { id: "providers" as const, path: "M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" },
  { id: "permissions" as const, path: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 11h7c-.77 3.74-3.54 6.86-7 8.1V12H5V6.3l7-3.11V12z" },
  { id: "general" as const, path: "M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" },
  { id: "h5Access" as const, path: "M9 24c-.88 0-1.7-.15-2.48-.44a6.5 6.5 0 01-2.02-1.29A6.6 6.6 0 013.2 20.3 6.35 6.35 0 012.75 18H4.8c.07.7.3 1.33.7 1.9.38.57.86 1.02 1.43 1.36.57.34 1.2.54 1.88.6.03.82.26 1.56.68 2.21.43.66 1 1.16 1.71 1.53.71.36 1.5.54 2.36.54 1.42 0 2.62-.5 3.62-1.5.25-.26.45-.54.6-.84l1.8.73a6.4 6.4 0 01-.88 1.36c-.66.78-1.49 1.38-2.5 1.82-.99.44-2.07.66-3.22.66zm0-4.8c-.52 0-.97-.17-1.35-.5a1.7 1.7 0 01-.55-1.28c0-.52.18-.97.55-1.35.38-.38.83-.57 1.35-.57.54 0 1 .19 1.38.57.37.38.56.83.56 1.35 0 .5-.19.95-.56 1.28-.37.33-.84.5-1.38.5zM12 0c1.05 0 2.05.14 3 .42.95.28 1.78.7 2.5 1.26s1.28 1.22 1.7 2.02c.4.8.63 1.72.68 2.74L15 7.4v-1l-.15-1.1c-.57-.2-1.1-.3-1.58-.3l-.36.02-.36.04-.32.07v6.9l4.8 2.8v3.2l-5.76-1.68L6 18.04v-3.2l4.07-2.76V7.22a4.73 4.73 0 01-.82-.72 5.8 5.8 0 01-.45-.63A5.6 5.6 0 019.5 5.8c1.52-1.36 2.94-1.96 4.35-2.1L12.75 2.6A7.4 7.4 0 0012 2.4c-.78 0-1.52.15-2.24.44a5.6 5.6 0 00-1.83 1.25c-.37.38-.74.82-1.1 1.32l-1.7-1.04A7.72 7.72 0 017.14 2.6 7.72 7.72 0 019.08.9 8.78 8.78 0 0112 0z" },
  { id: "adapters" as const, path: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h2v2H7V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9z" },
  { id: "terminal" as const, path: "M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 14H4V6h16v12zM6 10h2v2H6v-2zm0 3h2v2H6v-2zm4-3h2v2h-2v-2zm0 3h2v2h-2v-2zm4-3h4v2h-4v-2zm0 3h4v2h-4v-2z" },
  { id: "mcp" as const, path: "M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" },
  { id: "agents" as const, path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" },
  { id: "skills" as const, path: "M19 9l2.31-1.16c.4-.2.69-.6.69-1.04V6h-2V3h-3.26c-.44 0-.84.29-1.04.69L15 5l-1.16-2.31c-.2-.4-.6-.69-1.04-.69H9.2c-.44 0-.84.29-1.04.69L7 5l-2.31-1.16C4.4 3.64 4 3.34 4 2.9V1H1v3.26c0 .44.29.84.69 1.04L4 6.5 2.69 7.66c-.4.2-.69.6-.69 1.04V12h2V9.8l1.5-.56.48 1.28c.2.4.6.69 1.04.69h3.38c.44 0 .84-.29 1.04-.69l.48-1.28 1.5.56V12h2V9.8l1.5-.56.48 1.28c.2.4.6.69 1.04.69h3.38c.44 0 .84-.29 1.04-.69l.48-1.28L22 9.8V12h2V6h-5z" },
  { id: "plugins" as const, path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-8c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z" },
  { id: "computerUse" as const, path: "M13 1.07V3.07c4.07.5 7.27 3.84 7.56 7.93H22.63C22.27 5.53 18.47 1.67 13 1.07zM4.41 2.86L2.99 4.28l3.36 3.36C5.56 8.7 5 10.28 5 12c0 3.31 2.69 6 6 6 1.72 0 3.3-.56 4.42-1.35l2.3 2.3 1.41-1.41L4.41 2.86zM11 16c-2.21 0-4-1.79-4-4 0-.73.2-1.41.54-2l4.42 4.42c-.59.36-1.27.58-1.96.58zM17 12c0 1.04-.28 2.02-.78 2.87l1.46 1.46C18.47 14.96 19 13.55 19 12h-2z" },
  { id: "activity" as const, path: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" },
  { id: "diagnostics" as const, path: "M15.5 4l-4.5 6-2-3L4 18h2l4.5-7 2 3 4.5-6 5 8h2l-6-10z" },
  { id: "about" as const, path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" },
];

const SvgIcon = computed(() => {
  const icons: Record<string, string> = {};
  for (const svg of SVGS) icons[svg.id] = svg.path;
  return icons;
});
</script>

<template>
  <div class="dsker_settings-root">
    <div class="dsker_settings-sidebar">
      <div class="dsker_settings-menu-scroll">
        <div
          v-for="tab in [...store.allTabs, aboutTab]"
          :key="tab.id"
          class="dsker_settings-menu-item"
          :class="{ 'dsker_settings-menu-item--active': store.activeTabId === tab.id }"
          @click="store.setActiveTab(tab.id)"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="dsker_settings-menu-icon">
            <path :d="SvgIcon[tab.id]" />
          </svg>
          {{ tab.label }}
        </div>
      </div>
    </div>

    <div class="dsker_settings-content">
      <ProviderSettings v-if="store.activeTabId === 'providers'" />
      <PermissionSettings v-else-if="store.activeTabId === 'permissions'" />
      <GeneralSettings v-else-if="store.activeTabId === 'general'" />
      <H5AccessSettings v-else-if="store.activeTabId === 'h5Access'" />
      <AgentSettings v-else-if="store.activeTabId === 'agents'" />
      <SkillSettings v-else-if="store.activeTabId === 'skills'" />
      <PluginSettings v-else-if="store.activeTabId === 'plugins'" />
      <AdaptersSettings v-else-if="store.activeTabId === 'adapters'" />
      <TerminalSettings v-else-if="store.activeTabId === 'terminal'" />
      <McpSettings v-else-if="store.activeTabId === 'mcp'" />
      <ComputerUseSettings v-else-if="store.activeTabId === 'computerUse'" />
      <ActivitySettings v-else-if="store.activeTabId === 'activity'" />
      <DiagnosticsSettings v-else-if="store.activeTabId === 'diagnostics'" />
      <AboutSettings v-else-if="store.activeTabId === 'about'" />
    </div>
  </div>
</template>

<style scoped>
.dsker_settings-root {
  height: 100%;
  display: flex;
  overflow: hidden;
}

.dsker_settings-sidebar {
  width: 180px;
  min-width: 180px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-border);
  padding: 12px 0;
  overflow-y: auto;
}

.dsker_settings-menu-scroll {
  display: flex;
  flex-direction: column;
}


.dsker_settings-menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 180ms, color 180ms;
  color: var(--color-text-secondary);
  border: 0;
  background: transparent;
  text-align: left;
  line-height: 20px;
}

.dsker_settings-menu-item:hover {
  background: var(--color-surface-hover);
  color: var(--color-text-primary);
}

.dsker_settings-menu-item--active {
  background: var(--color-surface-selected);
  color: var(--color-text-primary);
  font-weight: 500;
}

.dsker_settings-menu-icon {
  flex-shrink: 0;
  opacity: 0.7;
}

.dsker_settings-menu-item--active .dsker_settings-menu-icon,
.dsker_settings-menu-item:hover .dsker_settings-menu-icon {
  opacity: 1;
}

.dsker_settings-menu-divider {
  height: 1px;
  margin: 4px 12px;
  background: var(--color-border);
  opacity: 0.4;
}

.dsker_settings-content {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  padding: 24px 32px;
}

.dsker_settings-placeholder {
  display: flex;
  justify-content: center;
  padding-top: 80px;
}
</style>
