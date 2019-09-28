<!--
 * @Author: liruigang
 * @Date: 2019-09-27 21:28:58
 * @LastEditors: liruigang
 * @LastEditTime: 2019-09-28 09:08:25
 * @UI: 
 -->
<template>
  <footer>
    <div class="container">
      <router-link class="logo-font" :to="{ name: 'home', params: {} }">
        leeruigan
      </router-link>
      <span class="attribution">
        长路漫漫，为剑作伴
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "RwvFooter"
};
</script>
