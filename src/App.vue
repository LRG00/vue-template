<template>
  <div id="app">
    <RwvHeader />
    <!-- <Music style="position: fixed;top:80px" /> -->
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
