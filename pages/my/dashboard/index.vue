<script setup>
import { useBus } from "@/utils/event-bus";
const { bus } = useBus();
const emit = inject("emit").value;
const on = inject("on").value;

const supabase = inject("supabaseClient");
const user = useSupabaseUser();
const userData = user.value;

const { data: watched, error } = await supabase
  .from("watched")
  .select("*")
  .eq("user_id", userData.id);

const { data: latest, error: lerror } = await supabase
  .from("channels")
  .select("*")
  .order("created_at", { ascending: false })
  .limit(10);
</script>

<template>
  <div class="pad-s">
    <div class="row">
      <div class="col-1-2">
        <h2>10 Most Recent</h2>
        <ul class="pad-l">
          <li v-for="thing in latest" v-bind:key="thing.id">
            <NuxtLink :to="`/chat/${thing.id}`">{{ thing.id }}</NuxtLink>
          </li>
        </ul>
      </div>
      <div class="high-off pad-t"></div>
      <div class="col-1-2">
        <h2>All Watched Channels</h2>
        <ul class="pad-l">
          <li v-for="thing in watched" v-bind:key="thing.id">
            <NuxtLink :to="`/chat/${thing.channel}`">{{
              thing.channel
            }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
