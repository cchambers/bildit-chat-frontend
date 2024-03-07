<script setup>
const route = useRoute();
const { channel } = route.params;
const supabase = inject("supabaseClient");
// check if channel exists
const { data, error } = await supabase
  .from("chats")
  .select("id")
  .eq("channel", channel)
  .single();

if (data) {
  navigateTo(`/chat/${data.id}`);
} else {
  // create one
}
</script>
<template>
  <div></div>
</template>
