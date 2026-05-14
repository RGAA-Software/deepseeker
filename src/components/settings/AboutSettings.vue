<script setup lang="ts">
</script>

<template>
  <div style="max-width: 480px; margin: 0 auto; display:flex; flex-direction:column; align-items:center; padding: 40px 0;">
    <!-- Logo -->
    <div class="dsker_about-logo">
      <span class="dsker_about-logo__primary">D</span><span class="dsker_about-logo__accent">S</span>
    </div>
    <h2 style="font-size:22px; font-weight:700; margin:12px 0 4px;">DeepSeeker</h2>
    <div style="font-size:13px; color:var(--color-text-tertiary); margin-bottom:24px;">
      v0.1.0
    </div>

    <!-- GitHub -->
    <a-card size="small" :bordered="true" hoverable style="width:100%; border-radius:0; margin-bottom:12px;">
      <a
        href="https://github.com/RGAA-Software/deepseeker"
        target="_blank"
        style="display:flex; align-items:center; gap:12px; text-decoration:none; color:inherit;"
      >
        <github-outlined style="font-size:20px; opacity:0.6;" />
        <div style="flex:1;">
          <div style="font-size:14px; font-weight:500;">RGAA-Software/deepseeker</div>
          <div style="font-size:12px; color:var(--color-text-tertiary);">在 GitHub 上查看</div>
        </div>
      </a>
    </a-card>

    <!-- Updates -->
    <a-card size="small" :bordered="true" style="width:100%; border-radius:0;">
      <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px;">
        <div>
          <div style="font-size:14px; font-weight:500;">更新</div>
          <div style="font-size:12px; color:var(--color-text-tertiary);">检查新版本和更新。</div>
        </div>
        <a-button size="small">检查更新</a-button>
      </div>
    </a-card>
  </div>
</template>

<style scoped>
.dsker_about-logo {
  display: flex;
  align-items: center;
  gap: 2px;
  font-family: var(--font-brand);
  font-size: 64px;
  line-height: 1;
  user-select: none;
  -webkit-user-select: none;
}
.dsker_about-logo__primary { color: #2563eb; }
.dsker_about-logo__accent { color: #dc2626; }
</style>
