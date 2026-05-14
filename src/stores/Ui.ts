import { defineStore } from "pinia";
import { ref } from "vue";

export const useUiStore = defineStore("ui", () => {
  const sidebarOpen = ref(true);

  function setSidebarOpen(open: boolean) {
    sidebarOpen.value = open;
  }

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value;
  }

  return {
    setSidebarOpen,
    sidebarOpen,
    toggleSidebar,
  };
});
