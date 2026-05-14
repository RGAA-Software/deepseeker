import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {
  readVersionedLocalState,
  writeVersionedLocalState,
} from "../utils/LocalState";
import { useSessionStore } from "./Sessions";

export type TabType = "session" | "scheduled" | "settings";

export type AppTab = {
  id: string;
  title: string;
  type: TabType;
  sessionId?: string;
};

export const SETTINGS_TAB_ID = "settings";
export const SCHEDULED_TAB_ID = "scheduled";
const TABS_STORAGE_KEY = "deepseeker.tabs";
const TABS_STORAGE_VERSION = 1;

type TabsState = {
  activeTabId: string | null;
  tabs: AppTab[];
};

export const useTabStore = defineStore("tabs", () => {
  const stored = readVersionedLocalState<TabsState>(
    TABS_STORAGE_KEY,
    TABS_STORAGE_VERSION,
    {
    activeTabId: null as string | null,
    tabs: [] as AppTab[],
    },
  );
  const tabs = ref<AppTab[]>(stored.tabs);
  const activeTabId = ref<string | null>(stored.activeTabId);

  const activeTab = computed(
    () => tabs.value.find((tab) => tab.id === activeTabId.value) ?? null,
  );

  function persist() {
    writeVersionedLocalState(TABS_STORAGE_KEY, TABS_STORAGE_VERSION, {
      activeTabId: activeTabId.value,
      tabs: tabs.value,
    });
  }

  function setActiveTab(tabId: string | null) {
    activeTabId.value = tabId;
    const nextTab = tabs.value.find((tab) => tab.id === tabId);
    if (nextTab?.type === "session" && nextTab.sessionId) {
      useSessionStore().setActiveSession(nextTab.sessionId);
    } else {
      useSessionStore().clearActiveSession();
    }
    persist();
  }

  function openSessionTab(sessionId: string, title: string) {
    const existing = tabs.value.find((tab) => tab.id === sessionId);
    if (!existing) {
      tabs.value.push({
        id: sessionId,
        title,
        type: "session",
        sessionId,
      });
    } else {
      existing.title = title;
    }
    activeTabId.value = sessionId;
    persist();
  }

  function openSpecialTab(type: "scheduled" | "settings") {
    const id = type === "scheduled" ? SCHEDULED_TAB_ID : SETTINGS_TAB_ID;
    const title = type === "scheduled" ? "定时任务" : "设置";
    const existing = tabs.value.find((tab) => tab.id === id);
    if (!existing) {
      tabs.value.push({
        id,
        title,
        type,
      });
    }
    activeTabId.value = id;
    persist();
  }

  function closeTab(tabId: string) {
    const tab = tabs.value.find((tab) => tab.id === tabId);
    if (!tab) {
      return;
    }

    // 如果关闭的是 session tab 且 session 无消息，删除该 session
    if (tab.type === "session" && tab.sessionId) {
      const sessionStore = useSessionStore();
      const session = sessionStore.sessions.find((s) => s.id === tab.sessionId);
      if (session && session.messages.length === 0) {
        sessionStore.deleteSession(tab.sessionId);
      }
    }

    const index = tabs.value.indexOf(tab);
    tabs.value.splice(index, 1);
    if (activeTabId.value !== tabId) {
      persist();
      return;
    }

    const nextTab = tabs.value[index] ?? tabs.value[index - 1] ?? null;
    activeTabId.value = nextTab?.id ?? null;
    if (nextTab?.type === "session" && nextTab.sessionId) {
      useSessionStore().setActiveSession(nextTab.sessionId);
    } else {
      useSessionStore().clearActiveSession();
    }
    persist();
  }

  function resetToEmptySession() {
    activeTabId.value = null;
    useSessionStore().clearActiveSession();
    persist();
  }

  function updateSessionTabTitle(sessionId: string, title: string) {
    const existing = tabs.value.find((tab) => tab.id === sessionId);
    if (existing) {
      existing.title = title;
      persist();
    }
  }

  return {
    activeTab,
    activeTabId,
    closeTab,
    openSessionTab,
    openSpecialTab,
    resetToEmptySession,
    setActiveTab,
    tabs,
    updateSessionTabTitle,
  };
});
