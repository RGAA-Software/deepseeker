<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";
import AppShell from "./components/layout/AppShell.vue";
</script>

<template>
  <ConfigProvider
    :theme="{
      token: {
        borderRadius: 9999,
        borderRadiusXS: 9999,
        borderRadiusSM: 9999,
        borderRadiusLG: 9999,
      },
    }"
  >
    <AppShell />
  </ConfigProvider>
</template>
