<script setup lang="ts">
import {
  AppstoreOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  CloseOutlined,
  CodeOutlined,
} from "@ant-design/icons-vue";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useTabStore } from "../../stores/Tabs";
import { useWindowStore } from "../../stores/Window";
import WindowControls from "./WindowControls.vue";

const TAB_SCROLL_STEP = 180;

const tabStore = useTabStore();
const windowStore = useWindowStore();
const scrollViewportRef = ref<HTMLElement | null>(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);
let resizeObserver: ResizeObserver | null = null;

const tabsWithStatus = computed(() =>
  tabStore.tabs.map((tab) => ({
    ...tab,
    showStatus: tabStore.activeTabId === tab.id,
  })),
);

function updateScrollState() {
  const element = scrollViewportRef.value;
  if (!element) {
    canScrollLeft.value = false;
    canScrollRight.value = false;
    return;
  }

  canScrollLeft.value = element.scrollLeft > 0;
  canScrollRight.value =
    element.scrollLeft + element.clientWidth < element.scrollWidth - 1;
}

function scrollTabs(direction: "left" | "right") {
  const element = scrollViewportRef.value;
  if (!element) {
    return;
  }

  element.scrollBy({
    left: direction === "left" ? -TAB_SCROLL_STEP : TAB_SCROLL_STEP,
    behavior: "smooth",
  });
}

function closeTab(tabId: string) {
  tabStore.closeTab(tabId);
}

function handleWheel(event: WheelEvent) {
  const element = scrollViewportRef.value;
  if (!element) {
    return;
  }

  const horizontalDelta =
    Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

  if (horizontalDelta === 0) {
    return;
  }

  event.preventDefault();
  element.scrollLeft += horizontalDelta;
  updateScrollState();
}

function syncActiveTabIntoView() {
  const element = scrollViewportRef.value;
  if (!element) {
    return;
  }

  if (!tabStore.activeTabId) {
    updateScrollState();
    return;
  }

  const activeTab = element.querySelector<HTMLElement>(
    `[data-tab-id="${tabStore.activeTabId}"]`,
  );
  activeTab?.scrollIntoView({
    block: "nearest",
    inline: "nearest",
    behavior: "smooth",
  });
  window.requestAnimationFrame(updateScrollState);
}

onMounted(() => {
  const element = scrollViewportRef.value;
  if (!element) {
    return;
  }

  element.addEventListener("scroll", updateScrollState, { passive: true });
  resizeObserver = new ResizeObserver(() => updateScrollState());
  resizeObserver.observe(element);
  window.requestAnimationFrame(updateScrollState);
});

onBeforeUnmount(() => {
  const element = scrollViewportRef.value;
  element?.removeEventListener("scroll", updateScrollState);
  resizeObserver?.disconnect();
});

watch(
  () => [tabStore.tabs.length, tabStore.activeTabId],
  async () => {
    await nextTick();
    syncActiveTabIntoView();
  },
  { immediate: true },
);
</script>

<template>
  <div class="dsker_tabbar">
    <a-button
      v-if="canScrollLeft"
      class="dsker_tabbar__scroll-button"
      type="text"
      aria-label="向左滚动标签栏"
      @click="scrollTabs('left')"
    >
      <template #icon>
        <CaretLeftOutlined />
      </template>
    </a-button>

    <div
      ref="scrollViewportRef"
      class="dsker_tabbar__scroll"
      @wheel="handleWheel"
    >
      <button
        v-for="tab in tabsWithStatus"
        :key="tab.id"
        :data-tab-id="tab.id"
        class="dsker_tab-item"
        :class="tabStore.activeTabId === tab.id ? 'dsker_tab-item--active' : ''"
        type="button"
        @click="tabStore.setActiveTab(tab.id)"
      >
        <span v-if="tab.showStatus" class="dsker_tab-item__status" />
        <span class="dsker_tab-item__title">{{ tab.title }}</span>
        <span class="dsker_tab-item__close" @click.stop="closeTab(tab.id)">
          <CloseOutlined />
        </span>
      </button>

      <div class="dsker_tabbar__empty" data-tauri-drag-region />
    </div>

    <div class="dsker_tabbar__tools">
      <a-button class="dsker_toolbar-button" type="text" aria-label="打开终端">
        <template #icon>
          <CodeOutlined />
        </template>
      </a-button>

      <a-button class="dsker_toolbar-button" type="text" aria-label="显示工作区">
        <template #icon>
          <AppstoreOutlined />
        </template>
      </a-button>
    </div>

    <div
      v-if="windowStore.showWindowControls"
      class="dsker_tabbar__drag-gutter"
      data-tauri-drag-region
      aria-hidden="true"
    />

    <a-button
      v-if="canScrollRight"
      class="dsker_tabbar__scroll-button"
      type="text"
      aria-label="向右滚动标签栏"
      @click="scrollTabs('right')"
    >
      <template #icon>
        <CaretRightOutlined />
      </template>
    </a-button>

    <WindowControls />
  </div>
</template>
