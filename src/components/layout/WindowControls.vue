<script setup lang="ts">
import {
  BorderOutlined,
  CloseOutlined,
  CopyOutlined,
  MinusOutlined,
} from "@ant-design/icons-vue";
import { useWindowStore } from "../../stores/Window";

const windowStore = useWindowStore();
</script>

<template>
  <div v-if="windowStore.showWindowControls && windowStore.appWindow" class="dsker_window-controls">
    <button
      aria-label="Minimize window"
      class="dsker_window-controls__button dsker_icon-button"
      type="button"
      @click="windowStore.runWindowAction(() => windowStore.appWindow!.minimize())"
    >
      <MinusOutlined />
    </button>

    <button
      :aria-label="windowStore.maximized ? 'Restore window' : 'Maximize window'"
      class="dsker_window-controls__button dsker_icon-button"
      type="button"
      @click="windowStore.runWindowAction(() => windowStore.appWindow!.toggleMaximize())"
    >
      <CopyOutlined v-if="windowStore.maximized" />
      <BorderOutlined v-else />
    </button>

    <button
      aria-label="Close window"
      class="dsker_window-controls__button dsker_window-controls__button--close dsker_icon-button"
      type="button"
      @click="windowStore.runWindowAction(() => windowStore.appWindow!.close())"
    >
      <CloseOutlined />
    </button>
  </div>
</template>
