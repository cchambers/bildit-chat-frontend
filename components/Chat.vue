<script setup>
import { useBus } from "@/utils/event-bus";
const { bus } = useBus();
const emit = inject("emit").value;
const on = inject("on").value;

const supabase = inject("supabaseClient");
const user = useSupabaseUser();
const userData = user.value;

const customer = ref(null);

const md = inject("md");
const props = defineProps({
  channel: String,
});
const input = ref(null);
const { data: history, error } = await supabase
  .from("histories")
  .select("*")
  .eq("channel", props.channel)
  .order("created_at", { ascending: false });

if (error) console.log(error);

const pastMessages = ref(history);

const textareaRef = ref(null);
const autoResize = (e) => {
  if (textareaRef.value) {
    nextTick(() => {
      // const borderHeight = textarea .value.offsetHeight - textarea .value.clientHeight;
      textareaRef.value.style.height = "auto";
      textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
    });
  }
};

const handleInput = async () => {
  input.value = input.value.trim();
  const obj = {
    channel: props.channel,
    message: input.value,
  };
  if (userData) obj.owner = userData.id;
  if (customer.value) obj.customer = customer.value;
  emit(`chat-message`, obj);
  input.value = "";
};

const loadMessage = (data) => {
  pastMessages.value.unshift(data);
};

onMounted(() => {
  emit("subscribe", `channel:${props.channel}`);
  on("user-sent", loadMessage);
  if (process.client) {
    const c = window.localStorage.getItem("customer");
    if (c) customer.value = c;
  }
});

onUnmounted(() => {
  emit("unsubscribe", `channel:${props.channel}`);
});
</script>

<template>
  <div class="chat-component">
    <div class="output">
      <div
        v-for="m in pastMessages"
        v-bind:key="m.id"
        :class="{ customer: m.customer, moderator: m.owner }"
      >
        <div class="message">
          {{ m.message }}
        </div>
      </div>
    </div>
    <div class="input" @keydown.enter.prevent="handleInput">
      <textarea
        v-model="input"
        ref="textareaRef"
        rows="1"
        @keyup="autoResize"
        @keydown.enter.shift.exact.stop
      ></textarea>
    </div>
  </div>
</template>

<style lang="scss">
.chat-component {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .output {
    height: 100%;
    flex-shrink: 1;
    padding: use(ss);
    .message {
      padding: use(sss) use(ss);
      border-radius: use(sss);
      width: max-content;
      max-width: 60%;
      margin-bottom: use(s);
    }
    .customer {
      .message {
        margin-left: auto;
        background: use(accent-tertiary);
        color: use(highlight-primary);
      }
    }
    .moderator {
      .message {
        margin-right: auto;
        background: use(highlight-tertiary);
        color: use(highlight-primary);
      }
    }
  }
  .input {
    padding: use(ss);
    textarea {
      min-width: 100%;
      resize: none;
      max-height: 30vh;
    }
  }
}
</style>
