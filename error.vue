<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <div class="flex col center align-middle">
    <h1 class="px-80 pad-t-aaa">{{ error.statusCode }}</h1>
    <NuxtLink to="/">back to homepage</NuxtLink>
  </div>
</template>
