<script setup>
const newPass = ref(null);

const updatePassword = async () => {
  const password = newPass.value.trim();
  if (password) {
    error.value = "";
    await supabase.auth.updateUser({ password });
  } else {
    error.value = "Password field empty.";
  }
};
</script>
<template>
  <div>
    <div class="col-1-2">
      <label for="up">New password:</label>
      <input id="up" type="text" v-model="newPass" full />
      <div class="state-error">{{ error }}</div>
      <ShButton variant="primary" @click="updatePassword">Save</ShButton>
    </div>
  </div>
</template>
