<template>
  <div>
    <h3> {{ currentPost?.postName }} </h3>
    <p>Author: {{ currentPost?.author }} </p>
    <p> {{ currentPost?.post }} </p>
    <hr>
    <p>comments:</p>
    <div v-for="comment in comments" :key="comment.commentId">
      <p>Author: {{ comment.commentAuthor }}</p>
      <p>{{ comment.comment }}</p>
      <p>Date: {{ getDateFromTimestamp(comment.date) }}</p>
      <hr>
    </div>
    <hr>
    <Comment :parentPostId="postId"/>
  </div>
</template>

<script setup>
import { getDateFromTimestamp } from '@/utils/timestampToDate';
// import allData from '@/data/data.json';
// import { getComments } from '@/utils/comments';
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useDataStore from '@/store/DataStore';
import Comment from "@/components/AddComment";
// import { storeToRefs } from 'pinia';

const dataStore = useDataStore();

const route = useRoute();
const router = useRouter();

let postId = ref('');

// eslint-disable-next-line no-unused-vars
const currentPost = computed(() => {
  return dataStore.getPostById(postId.value)
});

const comments = computed(() => {
  return dataStore.getCommentsById(postId.value)
})

onMounted(async () => {
  await router.isReady();
  postId.value = route.params.postId
});
</script>

<style scoped>
h3 {
  text-align: center;
  margin-bottom: 20px;
}
</style>