<script setup>
const user = inject("supabaseUser");
definePageMeta({
  layout: "my",
});
</script>

<template>
  <NuxtPage v-if="user" />
</template>
