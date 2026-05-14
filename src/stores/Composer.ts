import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {
  readVersionedLocalState,
  writeVersionedLocalState,
} from "../utils/LocalState";

const COMPOSER_STORAGE_KEY = "deepseeker.composer";
const COMPOSER_STORAGE_VERSION = 1;

type ComposerState = {
  emptyDraft: string;
  sessionDrafts: Record<string, string>;
};

export const useComposerStore = defineStore("composer", () => {
  const stored = readVersionedLocalState<ComposerState>(
    COMPOSER_STORAGE_KEY,
    COMPOSER_STORAGE_VERSION,
    {
    emptyDraft: "",
    sessionDrafts: {} as Record<string, string>,
    },
  );
  const emptyDraft = ref(stored.emptyDraft);
  const sessionDrafts = ref<Record<string, string>>(stored.sessionDrafts);

  function persist() {
    writeVersionedLocalState(
      COMPOSER_STORAGE_KEY,
      COMPOSER_STORAGE_VERSION,
      {
      emptyDraft: emptyDraft.value,
      sessionDrafts: sessionDrafts.value,
      },
    );
  }

  function setEmptyDraft(value: string) {
    emptyDraft.value = value;
    persist();
  }

  function getSessionDraft(sessionId: string) {
    return computed({
      get: () => sessionDrafts.value[sessionId] ?? "",
      set: (value: string) => {
        sessionDrafts.value = {
          ...sessionDrafts.value,
          [sessionId]: value,
        };
        persist();
      },
    });
  }

  function clearSessionDraft(sessionId: string) {
    const nextDrafts = { ...sessionDrafts.value };
    delete nextDrafts[sessionId];
    sessionDrafts.value = nextDrafts;
    persist();
  }

  return {
    clearSessionDraft,
    emptyDraft,
    getSessionDraft,
    sessionDrafts,
    setEmptyDraft,
  };
});
