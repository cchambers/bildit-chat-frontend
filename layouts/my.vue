<script setup>
import { useBus } from "@/utils/event-bus";
const { bus } = useBus();

const supabase = inject("supabaseClient");

let editorModalRef = ref(null);
let editWhich = ref(null);

const showEditorModal = (data) => {
  editWhich.value = data;
  editorModalRef.value.showModal();
};

const user = useSupabaseUser();
const userData = user.value;

const toast = inject("toast");

onMounted(() => {
  bus.on("open-editor", showEditorModal);
});

onUnmounted(() => {
  bus.off("open-editor");
});
</script>
<template>
  <div class="my layout">
    <div class="content contain mx-auto">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.layout.my {
  .content {
    height: 100dvh;
    width: 100%;
    > .flex {
      height: 100dvh;
    }
  }
}
</style>
