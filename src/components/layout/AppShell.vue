<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";
import { useWindowStore } from "../../stores/Window";
import ContentRouter from "./ContentRouter.vue";
import Sidebar from "./Sidebar.vue";
import TabBar from "./TabBar.vue";

const windowStore = useWindowStore();

onMounted(() => {
  void windowStore.initialize();
});

onBeforeUnmount(() => {
  windowStore.dispose();
});
</script>

<template>
  <div class="dsker_app-shell dsker_app-shell-viewport">
    <Sidebar />

    <main class="dsker_content-shell">
      <TabBar />
      <ContentRouter />
    </main>
  </div>
</template>
