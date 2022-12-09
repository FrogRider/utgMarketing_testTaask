<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <div class="wrapper">
    <router-view/>
  </div>
</template>

<script setup>
import allData from '@/data/data.json';
import { onMounted } from 'vue';
import useDataStore from '@/store/DataStore';

const dataStore = useDataStore();

onMounted(() => {
  dataStore.setPosts(allData.posts);
  dataStore.setComments(allData.comments);
  // console.log(dataStore.getPostById(222).author);
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrapper {
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
}
</style>
