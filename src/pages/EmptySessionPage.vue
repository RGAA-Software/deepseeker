<script setup lang="ts">
import EmptyComposer from "../components/chat/EmptyComposer.vue";
import RepositoryLaunchPanel from "../components/chat/RepositoryLaunchPanel.vue";
</script>

<template>
  <section class="dsker_empty-session">
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
      <EmptyComposer mode="empty" />
      <RepositoryLaunchPanel />
    </div>
  </section>
</template>
