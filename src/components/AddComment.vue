<template>
  <div class="addComment">
    <p>add comment</p>
    <input type="text" placeholder="your name" v-model="name">
    <textarea v-model="comment"></textarea>
    <button @click="add()">add</button>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, toRefs } from 'vue';
import useDataStore from '@/store/DataStore';

const props = defineProps({
  parentPostId: {
    required: true
  },
});

const { parentPostId } = toRefs(props);

const dataStore = useDataStore();

const isNameValid = ref(false);
const isCommentValid = ref(false);

const name = ref('');
const comment = ref('');

const getTime = () => JSON.stringify(Date. now()).slice(0, -3);

const add = () => {
  if (!isNameValid.value) {
    alert("Name field is invalid");
    return;
  }
  if (!isCommentValid.value) {
    alert("Comment field is invalid");
    return;
  }
  dataStore.addComment({
      "postId": parentPostId.value,
      "commentId": `comment${dataStore.getCommentsLength}`,
      "comment": comment.value,
      "commentAuthor": name.value,
      "date": getTime()
    })
}

watch(name, () => {
  if (name.value.length >= 2) {
    isNameValid.value = true;
  }
})

watch(comment, () => {
  if (comment.value.length >= 10) {
    isCommentValid.value = true;
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