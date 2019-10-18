<template>
  <div id="app">
    <RwvHeader />
    <Music />
    <router-view></router-view>
    <RwvFooter />
  </div>
</template>

<script>
import RwvHeader from "@/components/TheHeader";
import RwvFooter from "@/components/TheFooter";
import Music from "@/components/Music";

export default {
  name: "App",
  components: {
    RwvHeader,
    RwvFooter,
    Music
  }
};
</script>

<style></style>
