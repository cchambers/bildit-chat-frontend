<script setup>
const Profile = inject("profile");
</script>
<template>
  <div class="pad-s">
    <div class="welcome">
      <div class="hello">
        <p class="pad-b pad-t-s">
          Hey {{ Profile.full_name }}, want to see your
          <NuxtLink :to="`/@${Profile.username}`">public profile</NuxtLink>?
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-1-4 pad-r-s">
        <h3>My Stuff</h3>
        <ul class="pad-l">
          <li>New Comments or Replies</li>
          <li>Most Active Mods</li>
          <li>My Recent Instances</li>
        </ul>
      </div>
      <div class="col-1-4 pad-r-s" v-if="Profile.teams || Profile.team_member">
        <h3>My Teams</h3>
        <div class="pad-s back-lowlight-secondary radius-ss">
          <div v-for="team in Profile.teams" v-bind:key="team">
            <NuxtLink :to="`/my/teams/${team.id}`">{{ team.name }}</NuxtLink>
            (owner)
          </div>
          <div v-for="team in Profile.team_member" v-bind:key="team">
            <NuxtLink :to="`/my/teams/${team.team.id}`">{{
              team.team.name
            }}</NuxtLink>
          </div>
        </div>
      </div>
      <div class="col-1-4 pad-r-s">
        <h3>Other's Stuff</h3>
        <ul class="pad-l">
          <li>Popular Mods</li>
          <li>Popular Characters</li>
          <li>Popular Outlines</li>
        </ul>
      </div>
      <div class="col-1-4">fourth col</div>
    </div>
  </div>
</template>
