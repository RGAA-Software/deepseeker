<script setup lang="ts">
import { PlusOutlined, SendOutlined } from "@ant-design/icons-vue";
import { computed } from "vue";
import { useComposerStore } from "../../stores/Composer";
import { useSessionStore } from "../../stores/Sessions";

const props = defineProps<{
  mode: "empty" | "session";
  sessionId?: string;
}>();

const composerStore = useComposerStore();
const sessionStore = useSessionStore();

const draft = computed({
  get: () => {
    if (props.mode === "session" && props.sessionId) {
      return composerStore.getSessionDraft(props.sessionId).value;
    }
    return composerStore.emptyDraft;
  },
  set: (value: string) => {
    if (props.mode === "session" && props.sessionId) {
      composerStore.getSessionDraft(props.sessionId).value = value;
      return;
    }
    composerStore.setEmptyDraft(value);
  },
});

const canSubmit = computed(() => draft.value.trim().length > 0);

function submit() {
  const value = draft.value.trim();
  if (!value) {
    return;
  }

  if (props.mode === "session" && props.sessionId) {
    sessionStore.sendMessage(props.sessionId, value);
    composerStore.clearSessionDraft(props.sessionId);
    return;
  }

  sessionStore.createSession(value);
  composerStore.setEmptyDraft("");
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    submit();
  }
}
</script>

<template>
  <div class="dsker_composer-panel">
    <a-textarea
      v-model:value="draft"
      class="dsker_composer-input"
      placeholder="随便问点什么..."
      :auto-size="{ minRows: 1, maxRows: 12 }"
      :bordered="false"
      @keydown="handleKeydown"
    />

    <div class="dsker_composer-footer">
      <div class="dsker_composer-footer__left">
        <a-button class="dsker_composer-icon-button" type="text" aria-label="更多工具">
          <template #icon>
            <PlusOutlined />
          </template>
        </a-button>

        <a-button class="dsker_pill-button" type="default">询问权限</a-button>
      </div>

      <div class="dsker_composer-footer__right">
        <a-tag class="dsker_context-chip">200K context</a-tag>

        <a-button class="dsker_pill-button" type="default">DeepSeek V4</a-button>

        <a-button class="dsker_run-button" :disabled="!canSubmit" type="primary" @click="submit">
          运行
          <template #icon>
            <SendOutlined />
          </template>
        </a-button>
      </div>
    </div>
  </div>
</template>
