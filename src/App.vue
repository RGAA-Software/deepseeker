<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";
import AppShell from "./components/layout/AppShell.vue";
</script>

<template>
  <ConfigProvider
    :theme="{
      token: {
        borderRadius: 0,
        borderRadiusXS: 0,
        borderRadiusSM: 0,
        borderRadiusLG: 0,
      },
    }"
  >
    <AppShell />
  </ConfigProvider>
</template>
