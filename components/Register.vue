<script setup>
const user = useSupabaseUser();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMsg = ref("");
const submitted = ref(false);
const clicked = ref(false);
const { auth } = useSupabaseClient();
const userRegister = async () => {
  if (!password.value || !confirmPassword.value) {
    errorMsg.value = "Set a password.";
    setTimeout(() => {
      errorMsg.value = "";
    }, 3000);
    return;
  }
  if (password.value !== confirmPassword.value) {
    errorMsg.value = "Passwords do not match!";
    password.value = "";
    confirmPassword.value = "";
    setTimeout(() => {
      errorMsg.value = "";
    }, 3000);
    return;
  }
  try {
    const { error } = await auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        emailRedirectTo: "https://moddit.io/my/account",
      },
    });
    submitted.value = true;
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    if (error) throw error;
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = "";
    }, 3000);
  }
};
watchEffect(() => {
  if (process.client && user.value) {
    const redirectTo =
      window.sessionStorage.getItem("preLoginPath") || "/my/account";
    window.location.pathname = redirectTo;
  }
});
</script>

<template>
  <div class="pad-s">
    <section v-if="!submitted">
      <form @submit.prevent="userRegister">
        <h2>Register</h2>
        <div class="pad-y-s">
          <label for="email">Email</label>
          <input
            :disabled="clicked"
            v-model="email"
            autocomplete="off"
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div class="pad-y-s">
          <label for="password">Password</label>
          <input
            :disabled="clicked"
            v-model="password"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <div class="pad-y-s">
          <label for="confirmPassword">Confirm password</label>
          <input
            :disabled="clicked"
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
          />
        </div>
        <div class="pad-y-s">
          <ShButton @click="clicked = true" variant="primary" type="submit"
            >Submit</ShButton
          >
        </div>
        <div class="pad-y-s" v-if="errorMsg">{{ errorMsg }}</div>

        <div class="pad-y-s">
          <p>Already have an account?</p>
          <NuxtLink to="/login">Login</NuxtLink>
        </div>
      </form>
    </section>

    <section v-else>
      <div class="pad accent-secondary wt-bold px-22">Check your email!</div>
    </section>
  </div>
</template>
