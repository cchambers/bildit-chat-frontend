<script setup>
import { useBus } from "@/utils/event-bus";
const { bus } = useBus();

const supabase = inject("supabaseClient");

const user = useSupabaseUser();
const userData = user.value;

const toast = inject("toast");
</script>
<template>
  <div class="applet layout">
    <div class="dashboard-link" v-if="user">
      <NuxtLink to="/my/dashboard">
        <i class="material-icons">dashboard</i>
      </NuxtLink>
    </div>
    <slot />
  </div>
</template>

<style lang="scss">
body,
html {
  overflow: hidden;
}

.applet {
  .output {
    @include scroll-y;
    display: flex;
    flex-direction: column-reverse;
  }
  > .flex {
    height: 100dvh;
    width: 100vw;
  }

  .dashboard-link {
    a {
      display: flex;
      height: 5rem;
      width: 5rem;
      position: fixed;
      align-items: center;
      justify-content: center;
      top: use(ss);
      right: use(ss);
      color: use(accent-primary);
      &:hover {
        color: use(highlight-secondary);
      }
      i {
        font-size: 3rem;
      }
    }
  }
}
</style>
