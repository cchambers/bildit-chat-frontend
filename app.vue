<script setup>
import useSocket from "~/composables/useSocket";
const { socket, on, emit } = useSocket("http://localhost:3003");
provide("socket", ref(socket));
provide("on", ref(on));
provide("emit", ref(emit));

import { useToast } from "vue-toastification";
import { useProfileStore } from "~/store/profile";
import { useBus } from "@/utils/event-bus";
const { bus } = useBus();

import Showdown from "showdown";
const md = new Showdown.Converter();
provide("md", md);

import nuxtStorage from "nuxt-storage";
provide("storage", nuxtStorage);

const toast = useToast();
provide("toast", toast);

const supabase = useSupabaseClient();
provide("supabaseClient", supabase);

const user = await useSupabaseUser();

provide("supabaseUser", ref(user));
const userData = user.value;

if (userData && process.client) {
  emit("subscribe", `user:${userData.id}`);
}

const username = ref(null);
const userLogout = async () => {
  await supabase.auth.signOut();
};

const route = useRoute();
watch(route, async (value) => {
  await refreshNuxtData();
});

const Profile = useProfileStore();
const profileData = ref(null);

const fetchProfile = async () => {
  if (userData) {
    let { data: profile } = await supabase
      .from("profiles")
      .select(`*`)
      .eq("id", userData.id)
      .single();

    if (profile) {
      Profile.updateProfile(profile);
      profileData.value = profile;
    }
  }
};

if (userData) await fetchProfile();

provide("profile", ref(profileData));

bus.on("user-profile", (data) => {
  profileData.value = data;
});

const fetchUsername = async () => {
  if (userData) {
    let { data } = await supabase
      .from("profiles")
      .select(`username`)
      .eq("id", userData.id)
      .single();
    if (data) {
      username.value = data.username;
    } else {
      username.value = false;
    }
  }
};
provide("username", ref(username));
// if (userData.id) fetchUsername();

onMounted(() => {
  window.addEventListener("keydown", handleFirstTab);
  window.addEventListener("mousedown", handleMouseDown);
  if (!user.value && process.client) {
    const pathname = window.location.pathname;
    if (pathname !== "/login") {
      window.sessionStorage.setItem("preLoginPath", window.location.pathname);
    }
  }

  bus.on("nav-state", (data) => {
    if (data) {
      document.body.classList.add("o-hide");
    } else {
      document.body.classList.remove("o-hide");
    }
  });

  bus.on("copy", copy);

  // const someUserData = ref(null);
  // if (userData) {
  // get more info
  // }
  // provide("someUserData", ref(someUserData));

  bus.on("toast", (data) => {
    let type = data.type || "info";
    toast[type](data.message);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleFirstTab);
  window.removeEventListener("mousedown", handleMouseDown);
});

const userIsTabbing = ref(false);

function handleFirstTab(e) {
  if (e.keyCode === 9) {
    // the "I am a keyboard user" key
    userIsTabbing.value = true;
    document.body.classList.add("user-is-tabbing");
    window.removeEventListener("keydown", handleFirstTab);
    window.addEventListener("mousedown", handleMouseDown);
  }
}

function handleMouseDown() {
  userIsTabbing.value = false;
  document.body.classList.remove("user-is-tabbing");
  window.removeEventListener("mousedown", handleMouseDown);
  window.addEventListener("keydown", handleFirstTab);
}

useHead({
  titleTemplate: (title) => {
    return title ? `${title} - BILDIT Chat` : "BILDIT Chat v0.01";
  },
});

const copy = (data) => {
  if (process.client) {
    navigator.clipboard.writeText(data).then(() => {
      copySuccess.value = true;
      toast.info("Copied!");
      setTimeout(() => {
        copySuccess.value = false;
      }, 2000);
    });
  }
};

const navActive = ref(false);

onUnmounted(() => {
  bus.off("instance-forward");
  bus.off("add-to-list");
  bus.off("toast");
  bus.off("copy");
});
</script>
<template>
  <main ref="mainRef">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>
