<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import type { SessionItem } from "../../stores/Sessions";
import { useSessionStore } from "../../stores/Sessions";
import { useTabStore } from "../../stores/Tabs";

const props = defineProps<{
  session: SessionItem;
  renamingSessionId: string | null;
}>();

const emit = defineEmits<{
  startRename: [sessionId: string];
}>();

const sessionStore = useSessionStore();
const tabStore = useTabStore();

const contextMenuVisible = ref(false);
const contextMenuX = ref(0);
const contextMenuY = ref(0);
const renameValue = ref("");
const deleteConfirmVisible = ref(false);
const renameInputRef = ref<InstanceType<typeof HTMLInputElement> | null>(null);

const renaming = computed(() => props.renamingSessionId === props.session.id);

function onDocumentMouseDown(event: MouseEvent) {
  if (!renaming.value) return;
  // If clicking inside this row's rename area, don't exit
  const inputEl = (renameInputRef.value as any)?.$el || renameInputRef.value;
  if (inputEl && (inputEl as HTMLElement).contains?.(event.target as Node)) return;
  if (inputEl === event.target) return;
  finishRename();
}

// Watch renaming state to add/remove global listener
let removeTimeout: ReturnType<typeof setTimeout> | null = null;
watch(renaming, (val) => {
  if (val) {
    removeTimeout = setTimeout(() => {
      document.addEventListener("mousedown", onDocumentMouseDown, true);
    }, 0);
  } else {
    if (removeTimeout !== null) {
      clearTimeout(removeTimeout);
      removeTimeout = null;
    }
    document.removeEventListener("mousedown", onDocumentMouseDown, true);
  }
});

onBeforeUnmount(() => {
  if (removeTimeout !== null) clearTimeout(removeTimeout);
  document.removeEventListener("mousedown", onDocumentMouseDown, true);
});

function onContextMenu(event: MouseEvent) {
  event.preventDefault();
  contextMenuX.value = event.clientX;
  contextMenuY.value = event.clientY;
  contextMenuVisible.value = true;
}

function closeMenu() {
  contextMenuVisible.value = false;
}

function startRenameHere() {
  renameValue.value = props.session.title;
  contextMenuVisible.value = false;
  emit("startRename", props.session.id);
}

function cancelRename() {
  emit("startRename", "");
}

function finishRename() {
  if (renameValue.value.trim()) {
    sessionStore.renameSession(props.session.id, renameValue.value.trim());
  }
  emit("startRename", "");
}

function handleDeleteClick() {
  contextMenuVisible.value = false;
  deleteConfirmVisible.value = true;
}

function confirmDelete() {
  const tabId = props.session.id;
  sessionStore.deleteSession(props.session.id);
  tabStore.closeTab(tabId);
  deleteConfirmVisible.value = false;
}

function cancelDelete() {
  deleteConfirmVisible.value = false;
}

function onClick() {
  if (renaming.value) return;
  sessionStore.setActiveSession(props.session.id);
  tabStore.openSessionTab(props.session.id, props.session.title);
}
</script>

<template>
  <button
    class="dsker_session-row"
    :class="session.active ? 'dsker_session-row--active' : 'dsker_session-row--idle'"
    type="button"
    @click="onClick"
    @contextmenu="onContextMenu"
  >
    <span class="dsker_session-row__status" />
    <template v-if="renaming">
      <a-input
        ref="renameInputRef"
        v-model:value="renameValue"
        size="small"
        class="dsker_session-rename-input"
        @keydown.enter="finishRename"
        @keydown.escape="cancelRename"
        autofocus
      />
    </template>
    <template v-else>
      <span class="dsker_session-row__title">{{ session.title }}</span>
      <span class="dsker_session-row__time">{{ session.relative }}</span>
    </template>
  </button>

  <Teleport to="body">
    <div
      v-if="contextMenuVisible"
      class="dsker_context-menu-backdrop"
      @click="closeMenu"
      @contextmenu.prevent="closeMenu"
    />
    <div
      v-if="contextMenuVisible"
      class="dsker_context-menu"
      :style="{ left: contextMenuX + 'px', top: contextMenuY + 'px' }"
    >
      <div class="dsker_context-menu__item" @click="startRenameHere">
        <span class="dsker_context-menu__icon">✏</span>
        重命名
      </div>
      <div class="dsker_context-menu__divider" />
      <div class="dsker_context-menu__item dsker_context-menu__item--danger" @click="handleDeleteClick">
        <span class="dsker_context-menu__icon">🗑</span>
        删除
      </div>
    </div>

    <a-modal
      :open="deleteConfirmVisible"
      title="删除会话"
      @ok="confirmDelete"
      @cancel="cancelDelete"
      ok-text="删除"
      cancel-text="取消"
      :ok-button-props="{ danger: true }"
      :destroy-on-close="true"
      centered
    >
      <p>确定要删除「{{ session.title }}」吗？此操作无法撤销。</p>
    </a-modal>
  </Teleport>
</template>
