<script setup lang="ts">
import PersonalData from './PersonalData.vue';

const mockEmit = (event: string, detail: Record<string, unknown>) => {
  console.log('[mf-personal-data dev] Event:', event, detail);
};
</script>

<template>
  <PersonalData :emit="mockEmit" />
</template>
