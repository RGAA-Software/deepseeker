import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { TimeGroupKey } from "../constants/TimeGroups";
import { mockSessions, type SessionItem } from "../mocks/Sessions";
import { useTabStore } from "./Tabs";
import {
  readVersionedLocalState,
  writeVersionedLocalState,
} from "../utils/LocalState";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "tool";
  content: string;
  label?: string;
};

export type SessionRecord = SessionItem & {
  messages: ChatMessage[];
  status: "idle" | "running";
};

function buildAssistantReply(prompt: string) {
  const trimmed = prompt.trim();
  if (!trimmed) {
    return "已收到。";
  }

  return `已收到。我会围绕“${trimmed.slice(0, 36)}${trimmed.length > 36 ? "..." : ""}”继续推进，并把关键变更整理到会话里。`;
}

const SESSIONS_STORAGE_KEY = "deepseeker.sessions";
const SESSIONS_STORAGE_VERSION = 1;
type SessionsState = {
  activeSessionId: string | null;
  searchQuery: string;
  sessions: SessionRecord[];
};
const defaultSessions: SessionRecord[] = mockSessions.map((session) => ({
  ...session,
  status: session.active ? "running" : "idle",
  messages: session.active
    ? [
        {
          id: `${session.id}-m1`,
          role: "user",
          content: "我想重构登录流程，把 JWT 签名逻辑拆出去，并补上 payload 校验。",
        },
        {
          id: `${session.id}-m2`,
          role: "assistant",
          content:
            "已收到。我会先分析当前实现，再拆分 token helper，并补齐输入验证层。",
        },
        {
          id: `${session.id}-m3`,
          role: "tool",
          label: "edit_file",
          content: "更新 `src/lib/auth.ts`，抽离 `signToken()` 并增加 payload 校验。",
        },
      ]
    : [],
}));

export const useSessionStore = defineStore("sessions", () => {
  const stored = readVersionedLocalState<SessionsState>(
    SESSIONS_STORAGE_KEY,
    SESSIONS_STORAGE_VERSION,
    {
    activeSessionId: defaultSessions.find((session) => session.active)?.id ?? null,
    searchQuery: "",
    sessions: defaultSessions,
    },
  );
  const searchQuery = ref(stored.searchQuery);
  const sessions = ref<SessionRecord[]>(stored.sessions);
  const activeSessionId = ref(stored.activeSessionId);

  function persist() {
    writeVersionedLocalState(
      SESSIONS_STORAGE_KEY,
      SESSIONS_STORAGE_VERSION,
      {
      activeSessionId: activeSessionId.value,
      searchQuery: searchQuery.value,
      sessions: sessions.value,
      },
    );
  }

  const filteredSessions = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) {
      return sessions.value;
    }

    return sessions.value.filter((session) =>
      session.title.toLowerCase().includes(query),
    );
  });

  function sessionsForGroup(group: TimeGroupKey) {
    return filteredSessions.value.filter((session) => session.group === group);
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query;
    persist();
  }

  function setActiveSession(sessionId: string) {
    activeSessionId.value = sessionId;
    sessions.value = sessions.value.map((session) => ({
      ...session,
      active: session.id === sessionId,
      status: session.id === sessionId ? "running" : "idle",
    }));
    persist();
  }

  function clearActiveSession() {
    activeSessionId.value = null;
    sessions.value = sessions.value.map((session) => ({
      ...session,
      active: false,
      status: "idle",
    }));
    persist();
  }

  function createEmptySession() {
    const sessionId = `session-${Date.now()}`;
    const nextSession: SessionRecord = {
      id: sessionId,
      title: "新建会话",
      group: "today",
      relative: "now",
      active: true,
      status: "idle",
      messages: [],
    };

    sessions.value = [
      nextSession,
      ...sessions.value.map((session) => ({
        ...session,
        active: false,
        status: "idle" as const,
      })),
    ];
    activeSessionId.value = sessionId;
    useTabStore().openSessionTab(sessionId, "新建会话");
    persist();
    return sessionId;
  }

  function createSession(prompt: string) {
    const title = prompt.trim() || "未命名会话";
    const sessionId = `session-${Date.now()}`;
    const nextSession: SessionRecord = {
      id: sessionId,
      title,
      group: "today",
      relative: "now",
      active: true,
      status: "running",
      messages: prompt.trim()
        ? [
            {
              id: `${sessionId}-u1`,
              role: "user",
              content: prompt.trim(),
            },
            {
              id: `${sessionId}-a1`,
              role: "assistant",
              content: buildAssistantReply(prompt),
            },
          ]
        : [],
    };

    sessions.value = [
      nextSession,
      ...sessions.value.map((session) => ({
        ...session,
        active: false,
        status: "idle" as const,
      })),
    ];
    activeSessionId.value = sessionId;
    useTabStore().openSessionTab(sessionId, title);
    persist();
    return sessionId;
  }

  function sendMessage(sessionId: string, content: string) {
    const trimmed = content.trim();
    if (!trimmed) {
      return;
    }

    sessions.value = sessions.value.map((session) => {
      if (session.id !== sessionId) {
        return session;
      }

      return {
        ...session,
        active: true,
        relative: "now",
        status: "running",
        messages: [
          ...session.messages,
          {
            id: `${sessionId}-u-${session.messages.length + 1}`,
            role: "user",
            content: trimmed,
          },
          {
            id: `${sessionId}-a-${session.messages.length + 2}`,
            role: "assistant",
            content: buildAssistantReply(trimmed),
          },
        ],
      };
    });

    setActiveSession(sessionId);
    useTabStore().updateSessionTabTitle(sessionId, trimmed);
    persist();
  }

  function deleteSession(sessionId: string) {
    sessions.value = sessions.value.filter((session) => session.id !== sessionId);
    if (activeSessionId.value === sessionId) {
      activeSessionId.value = sessions.value[0]?.id ?? null;
      if (activeSessionId.value) {
        setActiveSession(activeSessionId.value);
      }
    }
    persist();
  }

  const activeSession = computed(
    () => sessions.value.find((session) => session.id === activeSessionId.value) ?? null,
  );

  return {
    activeSession,
    activeSessionId,
    createEmptySession,
    createSession,
    deleteSession,
    filteredSessions,
    searchQuery,
    sendMessage,
    sessions,
    sessionsForGroup,
    clearActiveSession,
    setActiveSession,
    setSearchQuery,
  };
});
