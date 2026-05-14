<script setup lang="ts">
import {
  FilterOutlined,
  GithubOutlined,
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
  ScheduleOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { timeGroups } from "../../constants/TimeGroups";
import { useSessionStore } from "../../stores/Sessions";
import { useTabStore } from "../../stores/Tabs";
import { useUiStore } from "../../stores/Ui";
import SessionGroup from "../session/SessionGroup.vue";

const sessionStore = useSessionStore();
const tabStore = useTabStore();
const uiStore = useUiStore();
</script>

<template>
  <aside class="dsker_sidebar-shell" :data-state="uiStore.sidebarOpen ? 'open' : 'closed'">
    <div class="dsker_sidebar-panel" :data-state="uiStore.sidebarOpen ? 'open' : 'closed'">
      <div class="dsker_sidebar-header" data-tauri-drag-region>
        <div class="dsker_sidebar-brand">
          <div class="dsker_app-icon" aria-hidden="true">
            <span class="dsker_app-icon__primary">D</span><span class="dsker_app-icon__accent">S</span>
          </div>
          <span
            class="dsker_sidebar-copy dsker_sidebar-brand-title"
            :class="uiStore.sidebarOpen ? 'dsker_sidebar-copy--visible' : 'dsker_sidebar-copy--hidden'"
          >
            <span class="dsker_sidebar-brand-title__primary">DeepSeek</span><span class="dsker_sidebar-brand-title__accent">er</span>
          </span>
        </div>

        <div class="dsker_sidebar-header-actions">
          <a-button
            v-if="uiStore.sidebarOpen"
            class="dsker_sidebar-link"
            type="text"
            title="GitHub"
            aria-label="GitHub"
            data-no-drag
          >
            <template #icon>
              <GithubOutlined />
            </template>
          </a-button>

          <button
            class="dsker_sidebar-toggle-button dsker_icon-button"
            data-no-drag
            :class="uiStore.sidebarOpen ? 'dsker_sidebar-toggle-button--open' : 'dsker_sidebar-toggle-button--collapsed'"
            type="button"
            :aria-label="uiStore.sidebarOpen ? '折叠侧边栏' : '展开侧边栏'"
            @click="uiStore.toggleSidebar()"
          >
            <LeftOutlined v-if="uiStore.sidebarOpen" />
            <RightOutlined v-else />
          </button>
        </div>
      </div>

      <div class="dsker_sidebar-nav">
        <button
          class="dsker_nav-item"
          :class="tabStore.activeTabId === null ? 'dsker_nav-item--primary' : ''"
          type="button"
          @click="sessionStore.createEmptySession()"
        >
          <span class="dsker_nav-item__icon"><PlusOutlined /></span>
          <span
            class="dsker_sidebar-copy"
            :class="uiStore.sidebarOpen ? 'dsker_sidebar-copy--visible' : 'dsker_sidebar-copy--hidden'"
          >
            新建会话
          </span>
        </button>

        <button
          class="dsker_nav-item"
          :class="tabStore.activeTabId === 'scheduled' ? 'dsker_nav-item--primary' : ''"
          type="button"
          @click="tabStore.openSpecialTab('scheduled')"
        >
          <span class="dsker_nav-item__icon"><ScheduleOutlined /></span>
          <span
            class="dsker_sidebar-copy"
            :class="uiStore.sidebarOpen ? 'dsker_sidebar-copy--visible' : 'dsker_sidebar-copy--hidden'"
          >
            定时任务
          </span>
        </button>
      </div>

      <template v-if="uiStore.sidebarOpen">
        <div class="dsker_sidebar-search">
          <a-button class="dsker_project-filter-button" type="text" aria-label="项目筛选">
            <template #icon>
              <FilterOutlined />
            </template>
          </a-button>
          <span class="dsker_sidebar-divider" aria-hidden="true" />
          <SearchOutlined class="dsker_search-icon" />
          <a-input
            :value="sessionStore.searchQuery"
            class="dsker_sidebar-search__input"
            :bordered="false"
            placeholder="搜索会话..."
            @update:value="sessionStore.setSearchQuery"
          />
        </div>

        <div class="dsker_session-list">
          <SessionGroup
            v-for="group in timeGroups"
            :key="group.key"
            :label="group.label"
            :sessions="sessionStore.sessionsForGroup(group.key)"
          />
        </div>
      </template>

      <div class="dsker_sidebar-footer" data-tauri-drag-region>
        <button
          class="dsker_nav-item dsker_nav-item--footer"
          :class="tabStore.activeTabId === 'settings' ? 'dsker_nav-item--primary' : ''"
          type="button"
          @click="tabStore.openSpecialTab('settings')"
        >
          <span class="dsker_nav-item__icon"><SettingOutlined /></span>
          <span
            class="dsker_sidebar-copy"
            :class="uiStore.sidebarOpen ? 'dsker_sidebar-copy--visible' : 'dsker_sidebar-copy--hidden'"
          >
            设置
          </span>
        </button>
      </div>
    </div>
  </aside>
</template>
