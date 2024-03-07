<script setup>
const user = useSupabaseUser();
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const { auth } = useSupabaseClient();
const userLogin = async () => {
  try {
    const { error } = await auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    submitted.value = true;
  } catch (error) {
    console.log(error);
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
  <main>
    <section>
      <form @submit.prevent="userLogin">
        <h2>Login</h2>
        <div class="pad-y-s">
          <label for="full-name">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div class="pad-y-s">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            required
          />
        </div>
        <div class="pad-y-s">
          <ShButton variant="primary" type="submit">Submit</ShButton>
        </div>
        <div class="pad-y-s" v-if="errorMsg">{{ errorMsg }}</div>
        <div class="pad-y-s">
          <p>You don't have an account yet?</p>
          <NuxtLink to="/register">Register</NuxtLink>
        </div>
      </form>
    </section>
  </main>
</template>
