<script setup>
const supabase = inject("supabaseClient");
const loading = ref(true);
const username = ref("");
const name = ref(null);
const avatar = ref(null);
const openAIKey = ref(null);
const huggingfaceKey = ref(null);
import { useBus } from "@/utils/event-bus";
const { bus } = useBus();

loading.value = true;
const user = useSupabaseUser();
const userData = user.value;

let { data } = await supabase
  .from("profiles")
  .select(`username`)
  .eq("id", userData.id)
  .single();

bus.emit("user-profile", data);

if (data) {
  username.value = data.username;
}

loading.value = false;

const updateProfile = async () => {
  try {
    loading.value = true;
    const user = useSupabaseUser();

    const updates = {
      id: user.value.id,
      username: username.value,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").upsert(updates, {
      returning: "minimal",
    });

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
    unchanged.value = true;
    // window.location.reload(true);
  }
};

const signOut = async () => {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    bus.emit("user-profile", null);
    loading.value = false;
  }
};

const resetPassword = async () => {
  await supabase.auth.resetPasswordForEmail(userData.email, {
    redirectTo: "/api/auth/callback",
  });
  alert("Check your email.");
};
const unchanged = ref(true);
</script>

<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <div class="margin-b-ss">
      <label for="email">Signed in as:</label>
      <input id="email" full type="text" :value="user.email" disabled />
    </div>
    <!-- <div class="pad-y-ss">
      <label for="username">Username</label>
      <input
        id="username"
        full
        @keydown="unchanged = false"
        type="text"
        autocomplete="off"
        v-model="username"
      />
    </div> -->

    <!-- <div class="flex pad-t-ss">
      <ShButton
        full
        variant="secondary"
        @click="updateProfile"
        :disabled="loading || unchanged"
      >
        Save Changes
      </ShButton>
    </div> -->
    <div class="pad-y">
      <div class="flex">
        <ShButton
          variant="primary"
          full
          @click="resetPassword"
          :disabled="loading"
        >
          Change Password
        </ShButton>
        <ShButton variant="secondary" full @click="signOut" :disabled="loading">
          Sign Out
        </ShButton>
      </div>
    </div>
  </form>
</template>
