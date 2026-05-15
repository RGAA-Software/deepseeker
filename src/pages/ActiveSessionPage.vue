<script setup lang="ts">
import { ref } from "vue";
import EmptyComposer from "../components/chat/EmptyComposer.vue";
import RepositoryLaunchPanel from "../components/chat/RepositoryLaunchPanel.vue";
import SessionMessageList from "../components/session/SessionMessageList.vue";
import { useSessionStore } from "../stores/Sessions";

const sessionStore = useSessionStore();

const selectedProject = ref("workspace");
const selectedBranch = ref("master");
</script>

<template>
  <section class="dsker_content-page">
    <template v-if="sessionStore.activeSession && sessionStore.activeSession.messages.length > 0">
      <div class="dsker_active-session__body">
        <div class="dsker_active-session__messages">
          <SessionMessageList :messages="sessionStore.activeSession.messages" />
        </div>

        <div class="dsker_active-session__composer">
          <EmptyComposer
            mode="session"
            :session-id="sessionStore.activeSessionId!"
          />

          <div class="dsker_repo-badge">
            <span class="dsker_repo-badge__project">{{ selectedProject }}</span>
            <span class="dsker_repo-badge__separator">|</span>
            <span class="dsker_repo-badge__branch">{{ selectedBranch }}</span>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="dsker_empty-session">
        <div class="dsker_empty-session__hero">
          <div class="dsker_hero-icon" aria-hidden="true">
            <div class="dsker_hero-icon__core">
              <span class="dsker_hero-icon__primary">D</span><span class="dsker_hero-icon__accent">S</span>
            </div>
          </div>
          <h1>新建会话</h1>
          <p>
            开始一个新的编码会话。DeepSeek 已准备好帮你构建、调试和架构你的项目。
          </p>
        </div>

        <div class="dsker_composer-shell">
          <EmptyComposer
            mode="session"
            :session-id="sessionStore.activeSessionId!"
          />
          <RepositoryLaunchPanel
            v-model:project="selectedProject"
            v-model:branch="selectedBranch"
          />
        </div>
      </div>
    </template>
  </section>
</template>
