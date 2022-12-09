<template>
  <div class="addPost">
    <p>add post</p>
    <input type="text" placeholder="your name" v-model="name">
    <input type="text" placeholder="post name" v-model="postName">
    <textarea v-model="post"></textarea>
    <button @click="add()">add</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import useDataStore from '@/store/DataStore';

const dataStore = useDataStore();

const isNameValid = ref(false);
const isPostNameValid = ref(false);
const isPostValid = ref(false);

const name = ref('');
const postName = ref('');
const post = ref('');

const getTime = () => JSON.stringify(Date. now()).slice(0, -3);

const add = () => {
  if (!isNameValid.value) {
    alert("Name field is invalid");
    return;
  }
  if (!isPostNameValid.value) {
    alert("Post name field is invalid");
    return;
  }
  if (!isPostValid.value) {
    alert("Comment field is invalid");
    return;
  }
  dataStore.addPost({
      "author": name.value,
      "postName": postName.value,
      "post": post.value,
      "date": getTime(),
      "id": `post${dataStore.getPostsLength}`
    })
}

watch(name, () => {
  if (name.value.length >= 2) {
    isNameValid.value = true;
  }
});

watch(postName, () => {
  if (postName.value.length >= 5) {
    isPostNameValid.value = true;
  }
});

watch(post, () => {
  if (post.value.length >= 10) {
    isPostValid.value = true;
  }
})
</script>

<style scoped>
input {
  display: block;
  width: 50%;
  padding: 10px;
  margin-top: 20px;
}

textarea {
  resize: unset;
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
}
</style>