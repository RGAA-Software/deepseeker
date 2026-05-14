import { defineStore } from "pinia";
import { computed, ref } from "vue";

type AppWindow = {
  minimize: () => Promise<void>;
  toggleMaximize: () => Promise<void>;
  close: () => Promise<void>;
  isMaximized: () => Promise<boolean>;
  onResized: (handler: () => void) => Promise<() => void>;
};

const isTauri =
  typeof window !== "undefined" &&
  ("__TAURI_INTERNALS__" in window || "__TAURI__" in window);
const isWindows =
  typeof navigator !== "undefined" && /Win/i.test(navigator.userAgent);

export const useWindowStore = defineStore("window", () => {
  const showWindowControls = computed(() => isTauri && isWindows);
  const maximized = ref(false);
  const appWindow = ref<AppWindow | null>(null);
  const initialized = ref(false);
  let unlistenResize: (() => void) | undefined;

  async function initialize() {
    if (initialized.value || !showWindowControls.value) {
      return;
    }

    initialized.value = true;

    try {
      const { getCurrentWindow } = await import("@tauri-apps/api/window");
      const currentWindow = getCurrentWindow() as unknown as AppWindow;
      appWindow.value = currentWindow;
      maximized.value = await currentWindow.isMaximized();
      unlistenResize = await currentWindow.onResized(async () => {
        maximized.value = await currentWindow.isMaximized();
      });
    } catch (error) {
      initialized.value = false;
      console.error("Failed to initialize window controls", error);
    }
  }

  function dispose() {
    unlistenResize?.();
    unlistenResize = undefined;
    initialized.value = false;
  }

  function runWindowAction(action: () => Promise<void>) {
    void action().catch((error) => {
      console.error("Window control action failed", error);
    });
  }

  return {
    appWindow,
    dispose,
    initialize,
    maximized,
    runWindowAction,
    showWindowControls,
  };
});
