<template>
  <div class="mainPage">
    <div class="mainPage__container">
      <Sort />
      <button @click="goToAddPost()" class="addPost">add post</button>
      <div class="postPreviews">
        <Post
          v-for="post in postsPerPage"
          :key="post.id"
          :post="post"
          :commentsQuantity="getCommentsNumber(post.id)"
        />
      </div>
    </div>
    <Pagination
      :current-page="currentPage"
      :total-number-of-pages="totalNumberOfPages"
      @change-page="setPage"
      v-if="totalNumberOfPages > 1"
    />
  </div>
</template>

<!-- eslint-disable no-unused-vars -->

<script setup>
import Post from '../components/PostPerview';
import Pagination from '../components/Pagination';
import Sort from '../components/SortPosts';
import { ref, computed } from 'vue';
import useDataStore from '@/store/DataStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();

const dataStore = useDataStore();

const { posts, comments } = storeToRefs(dataStore);

const POSTS_PER_PAGE = 3;
const currentPage = ref(0);

const goToAddPost = () => {
  router.push({name: 'addPost' })
};

const getCommentsNumber = (postId) => {
  return dataStore.getCommentsById(postId).length;
};

const setPage = (page) => {
  currentPage.value = page;
};

const totalNumberOfPages = computed(() => {
  return Math.ceil(posts.value.length / POSTS_PER_PAGE);
});

const showUsersFrom = computed(() => currentPage.value * POSTS_PER_PAGE);

// eslint-disable-next-line no-unused-vars
const postsPerPage = computed(() => {
  const result = posts.value;
  return result.slice(
    showUsersFrom.value,
    showUsersFrom.value + POSTS_PER_PAGE
  );
});
</script>

<style lang="scss">
  .mainPage {
    display: grid;
    grid-template-rows: 1fr auto;
    min-height: 100vh;
  }

  .postPreviews {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;

  }

  .addPost {
    margin-bottom: 20px;
  }
</style>