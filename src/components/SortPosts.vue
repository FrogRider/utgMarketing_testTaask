<template>
  <div class="sortPosts">
    <label>
      <input type="radio" name="sort" @input="timeFirstToLast()"/>
      date first to last
    </label>
    <label>
      <input type="radio" name="sort" @input="timeLastToFirst()"/>
      date last to first
    </label>
    <label>
      <input type="radio" name="sort" @input="comments()"/>
      comments amount
    </label>
    <label>
      <input type="radio" name="sort" @input="lastCommentDate()"/>
      last comment date new to old
    </label>
  </div>
</template>

<script setup>
import useDataStore from '@/store/DataStore';

const dataStore = useDataStore();

const timeFirstToLast = () => {
  dataStore.sortPostsByTimeFirstToLast();
};
const timeLastToFirst = () => {
  dataStore.sortPostsByTimeLastToFirst();
};
const comments = () => {
  dataStore.sortByCommentsDecreasing();
};
const lastCommentDate = () => {
  dataStore.sortByCommentsDates();
}
</script>

<style scoped>
label {
  display: block;
}

.sortPosts {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #000;
  margin-bottom: 10px;
}
</style>