<script setup lang="ts">
const projectOptions = [
  { value: "workspace", label: "当前工作区" },
  { value: "deepseeker", label: "D:/code/deepseeker" },
  { value: "cc-haha", label: "D:/code/cc-haha" },
];

const branchOptions = [
  { value: "master", label: "master" },
  { value: "feature/ui-shell", label: "feature/ui-shell" },
  { value: "refactor/stores", label: "refactor/stores" },
];
</script>

<template>
  <div class="dsker_repository-panel">
    <div class="dsker_repository-panel__row">
      <div class="dsker_repository-panel__field">
        <label>项目</label>
        <a-select
          size="large"
          :options="projectOptions"
          :default-value="'workspace'"
          style="width:250px"
        />
      </div>

      <div class="dsker_repository-panel__field">
        <label>分支</label>
        <a-select
          size="large"
          :options="branchOptions"
          :default-value="'master'"
          style="width:250px"
        />
      </div>
    </div>
  </div>
</template>
